import moment from 'moment';
import { SetAuthCookieType } from './type';

export const setAuthCookie: SetAuthCookieType = (
  name,
  path,
  authToken,
  authSecretKey,
  setCookie
) => {
  authToken.key = authSecretKey;
  // Вычисляю дату, до которой будет жить cookie
  const millisecondsNow = moment().valueOf();
  const millisecondsCookie = authToken.expires_in * 1000;
  const cookiesExpiresIn = moment(millisecondsNow + millisecondsCookie).toDate();

  setCookie(name, authToken, { path, expires: cookiesExpiresIn });
};
