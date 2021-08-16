import cookie from 'cookie';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

let PublicKEY = null;

if (process.env.NODE_ENV === 'production') {
  const jwtRS256File = path.join(process.cwd(), 'jwtRS256.key.pub');
  PublicKEY = fs.readFileSync(jwtRS256File, 'utf8');
} else {
  PublicKEY = fs.readFileSync('./middleware/jwtRS256.key.pub', 'utf8');
}

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
