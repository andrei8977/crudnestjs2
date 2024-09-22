import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {

  
  @IsEmail()
  @ApiProperty({
    example: "John@mail.com",
    required: true
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: "password123",
    required: false
  })
  password: string;

}
