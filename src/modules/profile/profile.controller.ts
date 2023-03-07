import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ReqUser } from '../user/dacorator/user.dacorator';
import { Response } from 'express';
import { ReqUserDto } from '../user/dto/request-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @Get()
    async getUserProfiles(@ReqUser() reqUser: ReqUserDto, @Res() response: Response) {
        try {
            const userId = reqUser.user_id;
            const userProfiles = await this.profileService.getUserProfiles(userId);
            return response.status(HttpStatus.OK).json(userProfiles);
        } catch (error) {
            if (!error.status) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
            }
            return response.status(error.status).json(error.response);
        }
    }

    @Get('/all')
    async getProfiles(@ReqUser() reqUser: ReqUserDto,
        @Res() response: Response,
        @Query('user_ids') user_ids: string,
        @Query('profile_ids') profile_ids: string) {
        try {
            const profiles = await this.profileService.getProfiles(user_ids, profile_ids)
            return response.status(HttpStatus.OK).json(profiles);
        } catch (error) {
            if (!error.status) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
            }
            return response.status(error.status).json(error.response);
        }
    }

    @Get('/:id')
    async getProfileById(@ReqUser() reqUser: ReqUserDto,
        @Res() response: Response,
        @Param('id') profileId: string) {
        try {
            const profile = await this.profileService.getProfileById(profileId);
            return response.status(HttpStatus.OK).json(profile);
        } catch (error) {
            if (!error.status) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
            }
            return response.status(error.status).json(error.response);
        }
    }

    @Post()
    async CreateProfile(@ReqUser() reqUser: ReqUserDto, @Res() response: Response, @Body() profile: CreateProfileDto) {
        try {
            const userId = reqUser.user_id;
            const newProfile = await this.profileService.createProfile(profile, userId);
            return response.status(HttpStatus.CREATED).json(newProfile);
        } catch (error) {
            if (!error.status) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
            }
            return response.status(error.status).json(error.response);
        }
    }

    @Delete('/:id')
    async DeleteProfile(@ReqUser() reqUser: ReqUserDto, @Res() response: Response, @Param('id') profileId: string) {
        try {
            const userId = reqUser.user_id;
            const isDeleted = await this.profileService.deleteProfile(userId, profileId);
            return response.status(HttpStatus.OK).json(isDeleted);
        } catch (error) {
            if (!error.status) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
            }
            return response.status(error.status).json(error.response);
        }
    }

    @Put('/:id')
    async UpdateProfile(@ReqUser() reqUser: ReqUserDto, @Res() response: Response, @Param('id') profileId: string, @Body() updatedProfile: UpdateProfileDto) {
        try {
            const isUpdated = await this.profileService.updateProfile(profileId, updatedProfile);
            return response.status(HttpStatus.OK).json(isUpdated);

        } catch (error) {
            if (!error.status) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
            }
            return response.status(error.status).json(error.response);
        }
    }
}
