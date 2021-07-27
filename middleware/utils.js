import cookie from 'cookie';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const PublicKEY = fs.readFileSync('./middleware/jwtRS256.key.pub', 'utf8');

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export function verifyToken(jwtToken) {
  try {
    return jwt.verify(jwtToken, PublicKEY, {
      algorithm: ['RS256']
    });
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
  const token = cookie.parse(req?.headers?.cookie || '')['DGALA-TOKEN'] ?? null;
  return { token };
}
