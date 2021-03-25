import { GoogleSignin } from '@react-native-community/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  appleAuth,
  AppleRequestResponse,
} from '@invertase/react-native-apple-authentication';

export const Auth = auth();

export default class AuthService {
  async signIn(
    email: string,
    password: string
  ): Promise<FirebaseAuthTypes.User> {
    const { user } = await Auth.signInWithEmailAndPassword(email, password);

    return user!;
  }

  async signUp(
    email: string,
    password: string
  ): Promise<FirebaseAuthTypes.User> {
    const { user } = await Auth.createUserWithEmailAndPassword(email, password);

    return user!;
  }

  public getGoogleUserCredential = async (): Promise<FirebaseAuthTypes.User> => {
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();
    const credential: FirebaseAuthTypes.AuthCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken
    );

    return await this.signInWithFirebaseCredential(credential);
  };

  public getAppleCredential = async (): Promise<FirebaseAuthTypes.User> => {
    const appleAuthRequestResponse: AppleRequestResponse = await appleAuth.performRequest(
      {
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL],
      }
    );

    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    const { identityToken, nonce } = appleAuthRequestResponse;
    const credential: FirebaseAuthTypes.AuthCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );
    return await this.signInWithFirebaseCredential(credential);
  };

  private signInWithFirebaseCredential = async (
    credential: FirebaseAuthTypes.AuthCredential
  ): Promise<FirebaseAuthTypes.User> => {
    const { user } = await auth().signInWithCredential(credential);
    return user;
  };

  async getAuthToken(): Promise<string | null> {
    return (await Auth.currentUser?.getIdToken()) ?? null;
  }

  watchUser(
    observer: (user: FirebaseAuthTypes.User | null) => void
  ): () => void {
    return Auth.onAuthStateChanged(observer);
  }

  signOut(): Promise<void> {
    return Auth.signOut();
  }
}
