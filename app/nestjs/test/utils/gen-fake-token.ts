import * as jwt from 'jsonwebtoken'

export function generateFakeToken(id: string, role: string): string {
    const secret = 'test_secret_key'
    return jwt.sign({ id, role }, secret)
}
