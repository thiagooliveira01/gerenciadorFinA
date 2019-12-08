// user.ts
export interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
}

export class User {
    public constructor(
      public Email: string,
      public Password: string,
      public ConfirmPassword: string
    ){}
  }