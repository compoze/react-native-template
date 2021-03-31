import { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '../model/User';
import { UserService } from '../services/UserService';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Auth } from '../services/AuthService';

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

  public getAuthUser(): FirebaseAuthTypes.User {
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
      console.log(error);
      throw error;
    }
  };

  // public async signUp(
  //   email: string,
  //   password: string,
  //   firstName: string,
  //   lastName: string,
  //   phoneNumber?: string
  // ): Promise<User> {
  // const user: User = await this.userService.signUpUser(
  //   email,
  //   firstName,
  //   lastName,
  //   phoneNumber,
  //   password
  // );
  // await this.login(email, password);

  //   return user;
  // }
}
