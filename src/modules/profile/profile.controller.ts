import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ReqUser } from '../user/dacorator/user.dacorator';
import { ReqUserDto } from '../user/dto/request-user.dto';

@Controller('profile')
export class ProfileController {

    @Get()
    getProfiles(@ReqUser() reqUser: ReqUserDto) {
        console.log(reqUser);
        return 'getting all profiles'
    }

}
