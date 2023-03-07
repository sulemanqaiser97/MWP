import { IsNotEmpty, IsString, Length } from "@nestjs/class-validator";

export class CreateProfileDto {

    @IsNotEmpty()
    @Length(6, 30)
    @IsString()
    profile_name: string;

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;
}
