import { Injectable } from '@nestjs/common'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
    constructor(private readonly tokenService: TokenService) {}

    async login(credentials: any): Promise<any> {
        const userId = 'user_id'
        const role = 'admin'

        const accessToken = this.tokenService.generateAccessToken(userId, role)

        return { accessToken }
    }
}
