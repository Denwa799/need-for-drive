export interface ILoginForm {
  submit: (values: { username: string; password: string }) => void;
}
