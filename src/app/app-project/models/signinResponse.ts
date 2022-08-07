export class SigninResponseModel {
  accessToken: string = '';

  constructor(
    accessToken: string
  ) {
    this.accessToken = accessToken;
  }
}
