import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Extract token from request headers
    const authHeader = req.headers.authorization;

    console.log(authHeader)
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove "Bearer " prefix

      try {
        // Verify the token and extract user data including the role
        const decodedToken = this.jwtService.verify(token) as { role: string };
        if (decodedToken && decodedToken.role) {
          // Set the user role extracted from the token in the request object
          // req.userRole = decodedToken.role;
        }
      } catch (error) {
        console.error('Token verification failed:', error.message);
      }
    }

    // Proceed to the next middleware or route handler
    next();
  }
}
