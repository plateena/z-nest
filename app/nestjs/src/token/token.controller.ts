import { Controller, Post, Body, ForbiddenException } from '@nestjs/common'
import { TokenService } from './token.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './token.dto'

@ApiTags('Auth')
@Controller()
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @ApiOperation({ summary: 'Get access token' })
    @Post('login')
    async login(
        @Body() credentials: LoginDto,
    ): Promise<{ accessToken: string }> {
        console.log(process.env)
        if (
            !credentials.password ||
            credentials.password !== process.env.ADMIN_PASSWORD
        ) {
            throw new ForbiddenException('Invalid credential')
        }

        const userId = '1'
        const role = 'admin'

        const accessToken = this.tokenService.generateAccessToken(userId, role)

        return { accessToken }
    }
}
