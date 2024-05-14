import * as jwt from 'jsonwebtoken';

export function generateFakeToken(role: string): string {
  const secret = 'test_secret_key';
  return jwt.sign({ role }, secret);
}
