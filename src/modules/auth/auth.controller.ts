import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async SignUp(@Body() user: CreateUserDto, @Res() response: Response) {
    try {
      const newUser = await this.authService.signup(user);
      return response.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      if (!error.status) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
      }
      return response.status(error.status).json(error.response);
    }
  }

  @Post('/login')
  async Login(@Body() user: LoginUserDto, @Res() response: Response) {
    try {
      const loginUser = await this.authService.login(user.email, user.password);
      return response.status(HttpStatus.OK).json(loginUser);
    } catch (error) {
      if (!error.status) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
      }
      return response.status(error.status).json(error.response);
    }
  }
}
