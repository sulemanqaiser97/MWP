import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';

@Module({
  imports: [
    JwtAuthModule,
    SequelizeModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
