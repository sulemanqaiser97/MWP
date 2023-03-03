import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuth } from './auth.interface';
import { iPayload } from './interface/payload.interface';

@Injectable()
export class JwtAuthService implements IAuth {
    constructor(private jwtService: JwtService) { }
    generateJwt(payload: iPayload) {
        try {
            const user = {
                user_id: payload.user_id,
                email: payload.email,
            };
            const token = this.jwtService.sign({ user });
            return token;
        } catch (error) {
            console.error({ error });
        }
    }

    async validateJwt(payload: string) {
        const result: { user: iPayload } = await this.jwtService.verifyAsync(
            payload,
        );
        return result.user;
    }

}
