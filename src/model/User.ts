export class User {
    public readonly userID: number;
    public readonly email: number;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly phoneNumber: string;

    public constructor(params: Partial<User> = {}) {
        const {
            userID,
            email,
            firstName = '',
            lastName = '',
            phoneNumber = '',
        } = params;

        this.userID = userID!;
        this.email = email!;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
}