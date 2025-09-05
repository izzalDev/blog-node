import { Email } from "../value-object/Email";
import { Password } from "../value-object/Password";
import { Username } from "../value-object/Username";

export class User<T = any> {
  private constructor(
    readonly email: Email,
    readonly createdAt: Date,
    private _username: Username,
    private _password: Password,
    private _modifiedAt: Date,
    readonly id?: T,
  ) {}

  static create<T>(
    username: Username,
    email: Email,
    password: Password,
  ): User<T> {
    const now = new Date();
    return new User(email, now, username, password, now);
  }

  static loadExisting<T>(
    id: T,
    username: Username,
    email: Email,
    password: Password,
    createdAt: Date,
    modifiedAt: Date,
  ): User<T> {
    return new User(email, createdAt, username, password, modifiedAt, id);
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get username(): Username {
    return this._username;
  }

  get password(): Password {
    return this._password;
  }

  set username(newUsername: Username) {
    this._username = newUsername;
    this._modifiedAt = new Date();
  }

  set password(newPassword: Password) {
    this._password = newPassword;
    this._modifiedAt = new Date();
  }

  toJson(): object {
    return {
      id: this.id,
      email: this.email.toString(),
      username: this.username.toString(),
      createdAt: this.createdAt.toISOString(),
      modifiedAt: this.modifiedAt.toISOString(),
    };
  }
}
