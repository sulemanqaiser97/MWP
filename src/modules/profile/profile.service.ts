import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import sequelize from 'sequelize/types/sequelize';
import { UserProfileMappingService } from '../user_profile_mapping/user_profile_mapping.service';
import { iProfile } from './interfaces/profile.interface';
import { profile } from './model/profile.model';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(profile)
        private profileModel: typeof profile,
        private readonly userProfileMappingService: UserProfileMappingService,
    ) { }

    async getProfiles(user_ids: string, profile_ids: string) {
        let userProfiles = [];
        if (user_ids) {
            const userIdsArr = JSON.parse(user_ids);
            const resultProfiles = await this.userProfileMappingService.findProvidedUsersProfiles(userIdsArr);
            userProfiles.push(...this.getRelevantFields(resultProfiles));
        }
        if (profile_ids) {
            const profileIdsArr = JSON.parse(profile_ids);
            const profiles = await this.profileModel.findAll(
                {
                    where: {
                        profile_id: { [Op.in]: profileIdsArr }
                    }
                });
            userProfiles.push(...profiles);
        }
        return userProfiles;
    }

    async getUserProfiles(userId: string) {
        const result = await this.userProfileMappingService.findUserProfiles(userId);
        const userProfiles = this.getRelevantFields(result)
        return userProfiles;
    }

    getRelevantFields(profilesData) {
        const profiles = profilesData.map((data) => {
            return data.profile;
        });
        return profiles;
    }

    async getProfileById(profileId: string): Promise<profile> {
        const isProfileExists = await this.checkProfileExists(profileId);
        if (!isProfileExists) {
            throw new NotFoundException(
                `Profile with id ${profileId} does not exists.`
            );
        }
        const profile: profile = await this.profileModel.findOne({
            where: {
                profile_id: profileId
            }
        });
        return profile;
    }

    async checkProfileExists(profileId: string): Promise<boolean> {
        const profile: profile = await this.profileModel.findOne({
            where: {
                profile_id: profileId
            }
        });
        if (profile) {
            return true;
        }
        return false;
    }

    async createProfile(profile: iProfile, userId: string): Promise<profile> {
        const newProfile = {
            profile_name: profile.profile_name,
            first_name: profile.first_name,
            last_name: profile.last_name,
            current_level: 1
        }
        const createdProfile: profile = await this.profileModel.create(newProfile);
        await this.userProfileMappingService.create(userId, createdProfile.profile_id)

        return createdProfile;
    }

    async deleteProfile(userId: string, profileId: string): Promise<string> {
        const isProfileExists = await this.checkProfileExists(profileId);
        if (!isProfileExists) {
            throw new NotFoundException(
                `Profile with id ${profileId} does not exists.`
            );
        }
        const totalMappingsCount = await this.userProfileMappingService.deleteMapping(userId, profileId);
        if (totalMappingsCount == 1) {
            await this.profileModel.destroy({
                where: {
                    profile_id: profileId
                }
            });
        }
        return "Profile Deleted."

    }

    async updateProfile(profileId: string, updatedProfile: iProfile) {
        const isProfileExists = await this.checkProfileExists(profileId);
        if (!isProfileExists) {
            throw new NotFoundException(
                `Profile with id ${profileId} does not exists.`
            );
        }
        const isUpdated = await this.profileModel.update(
            updatedProfile,
            { where: { profile_id: profileId } }
        )

        let message = ""
        if (isUpdated) {
            message = "Profile Updated."
        } else {
            message = "Profile Not Updated."
        }
        return {
            message: message,
            status: isUpdated[0]
        };
    }

}
