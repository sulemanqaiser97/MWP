import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { user_profile_mapping } from './model/user_profile_mapping.model';
import { profile } from "../profile/model/profile.model";
import { Op } from 'sequelize';


@Injectable()
export class UserProfileMappingService {
  constructor(
    @InjectModel(user_profile_mapping)
    private userProfileMapping: typeof user_profile_mapping,
  ) { }

  async create(user_id: string, profile_id: number): Promise<user_profile_mapping> {
    const userProfile = {
      user_id: user_id,
      profile_id: profile_id
    }
    const newUserProfile = await this.userProfileMapping.create(userProfile);
    return newUserProfile;
  }


  async findProvidedUsersProfiles(userIds: number[]): Promise<user_profile_mapping[]> {

    const profiles = await this.userProfileMapping.findAll(
      {
        where: {
          user_id: {
            [Op.in]: userIds
          }
        },
        include: profile,
        attributes: ['profile_id']
      });
    return profiles;
  }

  async findUserProfiles(userId: string): Promise<user_profile_mapping[]> {

    const profiles = await this.userProfileMapping.findAll(
      {
        where: { user_id: userId },
        include: profile,
        attributes: ['profile_id']
      });
    return profiles;
  }

  async countRecords(profile_id: string) {
    const totalRecords = await this.userProfileMapping.count({
      where: {
        profile_id: profile_id
      }
    });
    return totalRecords;
  }

  async isUserProfileMappingExists(userId: string, profileId: string) {
    const isMappingExists = await this.userProfileMapping.findOne({
      where: {
        user_id: userId,
        profile_id: profileId
      }
    })

    if (isMappingExists) {
      return true;
    }
    return false;
  }

  async deleteMapping(userId: string, profileId: string) {
    const isMappingExists = await this.isUserProfileMappingExists(userId, profileId);
    if (!isMappingExists) {
      throw new BadRequestException(
        `You can't delete other users profiles.`
      );
    }

    const totalRecords = await this.countRecords(profileId);
    await this.userProfileMapping.destroy({
      where: {
        profile_id: profileId,
        user_id: userId
      }
    })
    return totalRecords;
  }
}
