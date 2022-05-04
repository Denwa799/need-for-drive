export interface ILoginForm {
  submit: (values: { username: string; password: string }) => void;
  usernameValue: string;
  setUsernameValue: (value: string) => void;
  passwordValue: string;
  setPasswordValue: (value: string) => void;
}
