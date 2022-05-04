import { ILoginResponse } from 'models/IAuth';

// Приходится использовать any, так как в функцию setCookie из хука useCookies приходит generic
// с типом - самим названием cookie
export type SetCookieType = (name: any, value: string | object, options: object) => void;
export type SetAuthCookieType = (
  name: string,
  path: string,
  authToken: ILoginResponse,
  authSecretKey: string,
  setCookie: SetCookieType
) => void;
