export class User {
  public readonly id: number;
  public readonly email: number;

  public constructor(params: Partial<User> = {}) {
    const { id, email } = params;

    this.id = id!;
    this.email = email!;
  }
}
