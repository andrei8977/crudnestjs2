import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateJwtDto {

  @IsString()
  @ApiProperty({
    example: "admin",
    required: true
  })
  role: string;

}
