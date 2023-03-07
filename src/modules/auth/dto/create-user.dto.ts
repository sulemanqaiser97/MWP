import { IsEmail, IsIn, IsNotEmpty, Matches } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

const validRoles = ['parent', 'teacher'];

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 7,
    maxLength: 20,
    pattern: '^[a-zA-Z0-9]{7,20}$',
  })
  @IsNotEmpty()
  @Matches('^[a-zA-Z0-9]{7,20}$')
  password: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'User role',
    example: 'teacher',
    enum: validRoles,
  })
  @IsNotEmpty()
  @IsIn(validRoles)
  role: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+353123456789',
    pattern: '^[+353]{4}[0-9]{10}$',
  })
  @IsNotEmpty()
  @Matches('^[+353]{4}[0-9]{10}$')
  phone_number: string;
}
