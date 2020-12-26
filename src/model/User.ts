export class User {
  public readonly userID: number;
  public readonly email: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phoneNumber: string;
  public readonly profilePhotoUrl: string;

  public constructor(params: Partial<User> = {}) {
    const {
      userID,
      email,
      firstName = '',
      lastName = '',
      phoneNumber = '',
      profilePhotoUrl = '',
    } = params;

    this.userID = userID!;
    this.email = email!;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.profilePhotoUrl = profilePhotoUrl;
  }
  public getFullName = (): string => {
    return this.firstName.trim() + ' ' + this.lastName.trim();
  };
}
