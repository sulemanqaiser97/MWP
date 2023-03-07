import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { profile } from './model/profile.model';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserProfileMappingModule } from '../user_profile_mapping/user_profile_mapping.module'


@Module({
  imports: [
    SequelizeModule.forFeature([profile]),
    UserProfileMappingModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule { }
