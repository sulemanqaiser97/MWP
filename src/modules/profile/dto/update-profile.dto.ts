import { IsString, Length } from "@nestjs/class-validator";

export class UpdateProfileDto {

    profile_name: string;

    first_name: string;

    last_name: string;
}
