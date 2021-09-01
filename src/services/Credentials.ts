export class Credentials {
  public constructor(user: string, token: string) {
    this.user = user;
    this.token = token;
  }
  public user: string;
  public token: string;
}
