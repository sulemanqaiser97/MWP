import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  GetAll() {
    console.log('Getting all users..');
    return this.userService.findAllUsers();
  }

  @Delete('/:id')
  deleteUserById(@Param('id') userId: string) {
    console.log('delete users..');
    return this.userService.deleteUserById(userId);
  }
}
