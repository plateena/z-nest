import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    async use(req: Request, _: Response, next: NextFunction) {
        const authHeader = req.headers.authorization

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7)

            try {
                const decodedToken = this.jwtService.verify(token) as {
                    id: string
                    role: string
                }
                if (decodedToken) {
                    req.user = { id: decodedToken.id, role: decodedToken.role }
                }
            } catch (error) {
                throw new ForbiddenException('Token verification failed:'+ error.message)
            }
        }

        next()
    }
}
