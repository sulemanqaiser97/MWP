import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [JwtAuthService],
  exports: [JwtAuthService]
})
export class JwtAuthModule { }
