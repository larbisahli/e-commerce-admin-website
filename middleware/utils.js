import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const SECRET_KEY = process.env.JWT_KEY;

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export function verifyToken(jwtToken) {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (error) {
    console.log('verifyToken Error:>>', error);
    return null;
  }
}

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export function getAppCookies(req) {
  let token = null;
  if (req.headers.cookie) {
    const { pl_gp_token } = cookie.parse(req.headers.cookie || '');
    token = pl_gp_token;
  }
  return { token };
}
