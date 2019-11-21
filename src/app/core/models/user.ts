// user.ts
export interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
}