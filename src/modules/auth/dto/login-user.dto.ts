import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'Pa$$w0rd',
  })
  @IsNotEmpty()
  password: string;
}
