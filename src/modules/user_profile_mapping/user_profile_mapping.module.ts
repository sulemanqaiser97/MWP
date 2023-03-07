import { Module } from '@nestjs/common';
import { UserProfileMappingService } from './user_profile_mapping.service';
import { UserProfileMappingController } from './user_profile_mapping.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user_profile_mapping } from './model/user_profile_mapping.model';

@Module({
  imports: [
    SequelizeModule.forFeature([user_profile_mapping])
  ],
  controllers: [UserProfileMappingController],
  providers: [UserProfileMappingService],
  exports: [UserProfileMappingService]
})
export class UserProfileMappingModule { }
