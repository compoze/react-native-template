import firebase, { RNFirebase } from 'react-native-firebase';
import { User } from '../model/User'
import { UserService } from '../services/UserService';
export const Firebase = firebase;
export const Auth = firebase.auth();

export class UserStore {
    private userService: UserService = new UserService();
    public user: User | null = null;

    public get isAuthenticated(): boolean {
        return !!Auth.currentUser;
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
            const user: User = await this.userService.loginUser(email, password);
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