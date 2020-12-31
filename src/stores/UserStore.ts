import firebase, { RNFirebase } from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import { User } from '../model/User';
import { UserService } from '../services/UserService';
import { GoogleSignin } from '@react-native-community/google-signin';
import {
  isHardenPassword,
  isValidEmail,
  PasswordHardeningLevels,
} from '../utilities/ValidationUtils';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Log from '../utilities/Logger';

export const Firebase = firebase;
export const Auth = firebase.auth();

export class UserStore {
  private userService: UserService = new UserService();
  public user: User | null = null;

  public async setup(): Promise<void> {
    if (Auth.currentUser !== null) {
      const user: User = await this.userService.getAuthenticatedUser();
      this.user = user;
    }
  }

  public get isAuthenticated(): boolean {
    return !!Auth.currentUser;
  }

  public get currentUser(): User | null {
    return this.user;
  }

  public getFullName = (): string => {
    if (this.user) {
      return this.user.getFullName();
    } else {
      return '';
    }
  };

  public static getAuthUser(): RNFirebase.User {
    return Auth.currentUser;
  }

  public logout(): Promise<void> {
    this.user = null;
    return Auth.signOut();
  }

  public async login(email: string, password: string): Promise<User> {
    await Auth.signInWithEmailAndPassword(email, password);

    const user: User = await this.userService.getAuthenticatedUser();
    this.user = user;

    return user;
  }

  public authUserHasExistingProfile = async (): Promise<boolean> => {
    try {
      await this.userService.getAuthenticatedUser();
      return true;
    } catch (error) {
      if (error[0] && error[0].message === 'User Not Found') {
        return false;
      } else {
        Log.log(error);
        throw error;
      }
    }
  };
  public getCurrentUser = async (
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string
  ): Promise<void> => {
    let existingUser: User | null = null;
    if (Auth) {
      try {
        existingUser = await this.userService.getAuthenticatedUser();
        this.user = existingUser;
        return;
      } catch (error) {
        if (error[0] && error[0].message === 'User Not Found') {
          try {
            await this.signUpUserThroughAuth(
              firstName,
              lastName,
              email,
              phoneNumber
            );
          } catch (error) {
            Log.log(error);
            throw error;
          }
        } else {
          Log.log(error);
          throw error;
        }
      }
    } else {
      this.user = null;
      return;
    }
  };
  public async signUpUserThroughAuth(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string
  ): Promise<User> {
    if (phoneNumber) {
      this.user = await this.userService.signUpAuthUser(
        email,
        firstName,
        lastName,
        Auth.currentUser.uid,
        phoneNumber
      );
    } else {
      this.user = null;
      return;
    }
  }

  public googleLogin = async (): Promise<User> => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // use Google credential to create/sign in on firebase
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      await firebase.auth().signInWithCredential(credential);

      // get user if exists
      try {
        const user: User = await this.userService.getAuthenticatedUser();
        this.user = user;
        return user;
      } catch (error) {
        if (error[0].message === 'Not Found') {
          //create a new user
          const user: User = await this.userService.signUpAuthUser(
            userInfo.user.email,
            userInfo.user.givenName,
            userInfo.user.familyName,
            Auth.currentUser.uid
          );
          this.user = user;
          return user;
        } else {
          throw error;
        }
      }
    } catch (error) {
      Log.log(error);
      throw error;
    }
  };

  public async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string
  ): Promise<User> {
    if (!isValidEmail(email)) {
      return Promise.reject('Error: Invalid email format');
    }
    if (!isHardenPassword(password, PasswordHardeningLevels.second)) {
      return Promise.reject('Error: Invalid Password format');
    }
    const user: User = await this.userService.signUpUser(
      email,
      firstName,
      lastName,
      phoneNumber,
      password
    );
    await this.login(email, password);

    return user;
  }

  public forgotPassword = (email: string) => {
    return Auth.sendPasswordResetEmail(email);
  };

  public getAppleCredential = async () => {
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const credential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );
      // use Apple credential to create/sign in on firebase
      await auth().signInWithCredential(credential);
      return appleAuthRequestResponse;
    } catch (error) {
      Log.log(error);
      throw error;
    }
  };

  public async uploadUserProfilePhoto(userId: number, filePath: string) {
    await this.userService.uploadUserProfilePhoto(userId, filePath);
  }
}
