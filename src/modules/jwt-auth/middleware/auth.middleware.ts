import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, NextFunction } from 'express';

import { JwtAuthService } from '../jwt-auth.service';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtAuthService: JwtAuthService,
        private userAuthService: AuthService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.headers.authorization === undefined) {
                throw new UnauthorizedException('No bearer token given');
            }
            const token = req.headers.authorization.replace('Bearer ', '');

            const result = await this.jwtAuthService.validateJwt(token);
            const user = await this.userAuthService.getUserByEmail(
                result.email,
            );
            if (!user) {
                throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
            } else {
                req.user = result;
                next();
            }
        } catch (error) {
            if (error.status) {
                throw new HttpException(error.message, error.status);
            }
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
