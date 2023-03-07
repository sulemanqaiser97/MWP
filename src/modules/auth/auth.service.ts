import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { iUser } from './interfaces/user.interface';
import { User } from './model/user.model';
import { AuthHelper } from './helper/auth.helper';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { iPayload } from '../jwt-auth/interface/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,

    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async signup(user): Promise<iUser> {
    const isUserAlreadyExist = await this.getUserByEmail(user.email);
    if (isUserAlreadyExist) {
      throw new BadRequestException(
        'Email address already exist',
      );
    }

    const hashPassword = await AuthHelper.encryptPassword(user.password);
    user.password = hashPassword;

    const newUser = await this.userModel.create(user);
    const payload: iPayload = {
      user_id: newUser.user_id,
      email: newUser.email
    }
    const token: string = this.jwtAuthService.generateJwt(payload);

    return {
      message: 'User successfully registered.',
      user: newUser,
      token: token
    };
  }

  async getUserByEmail(userEmail: string): Promise<Boolean> {
    const isUser = await this.userModel.findOne({
      where: {
        email: userEmail
      }
    })
    if (isUser) {
      return true;
    }
    return false;
  }

  async login(userEmail: string, userPassword: string): Promise<iUser> {
    const user = await this.userModel.findOne({
      where: { email: userEmail, },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await AuthHelper.matchPassword(
      userPassword,
      user.password,
    );

    if (isPasswordMatch) {
      const payload: iPayload = {
        user_id: user.user_id,
        email: user.email
      }
      const token: string = this.jwtAuthService.generateJwt(payload);

      return {
        message: 'Login success.',
        user: user,
        token: token
      };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

}
