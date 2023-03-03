import { IsEmail, IsIn, IsNotEmpty, Matches } from "@nestjs/class-validator";

const validRoles = ['parent', 'teacher']

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Matches('^[a-zA-Z0-9]{7,20}$')
    password: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsIn(validRoles)
    role: string;

    @IsNotEmpty()
    @Matches('^[+353]{4}[0-9]{10}$')
    phone_number: string;
}
