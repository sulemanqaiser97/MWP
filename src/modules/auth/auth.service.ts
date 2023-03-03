import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { iUser } from './interfaces/user.interface';
import { User } from './model/user.model';
import { AuthHelper } from './helper/auth.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async signup(user): Promise<iUser> {
    const isUserExist = await this.isEmailAlreadyRegister(user.email);
    if (isUserExist) {
      throw new BadRequestException(
        'Email address already exist',
      );
    }

    const hashPassword = await AuthHelper.encryptPassword(user.password);
    user.password = hashPassword;

    const newUser = await this.userModel.create(user);
    return {
      message: 'User successfully registered.',
      user: newUser
    };
  }

  async isEmailAlreadyRegister(userEmail: string): Promise<Boolean> {
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
      where: { email: userEmail, }
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await AuthHelper.matchPassword(
      userPassword,
      user.password,
    );

    if (isPasswordMatch) {
      return {
        message: 'Login success.',
        user: user
      };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

}
