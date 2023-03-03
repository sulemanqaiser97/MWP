import { Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { ReqUser } from './dacorator/user.dacorator';
import { ReqUserDto } from './dto/request-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('/all')
    GetAll(@ReqUser() user: ReqUserDto) {
        console.log(user);
        return this.userService.findAllUsers();
    }

    @Delete('/:id')
    deleteUserById(@Param('id') userId: string) {
        console.log("delete users..");
        return this.userService.deleteUserById(userId);
    }

}
