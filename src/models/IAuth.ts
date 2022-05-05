export interface ILoginResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  user_id: string;
  key?: string;
}
