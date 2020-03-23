import firebase, { RNFirebase } from 'react-native-firebase';
import { User } from '../model/User'
import { UserService } from '../services/UserService';
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

    public getAuthUser(): RNFirebase.User {
        return Auth.currentUser;
    }

    public logout(): Promise<void> {
        this.user = null;
        return Auth.signOut();
    }

    public async login(email: string, password: string): Promise<User> {
        try {
            await Auth.signInWithEmailAndPassword(email, password);

            const user: User = await this.userService.getAuthenticatedUser();
            this.user = user;
            return user;
        } catch (errors) {
            throw (errors);
        }
    }

    public async signUp(email: string, password: string, firstName: string, lastName: string, phoneNumber?: string): Promise<User> {
        try {
            const user: User = await this.userService.signUpUser(email, firstName, lastName, phoneNumber, password);
            await this.login(email, password);
            return user;
        } catch (errors) {
            throw (errors)
        }
    };
}