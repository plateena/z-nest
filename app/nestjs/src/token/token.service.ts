import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    generateAccessToken(userId: string, role: string): string {
        const payload = { id: userId, role }
        return this.jwtService.sign(payload)
    }
}
