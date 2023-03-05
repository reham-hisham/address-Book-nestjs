import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
export class userDto {
  @IsEmail()
  @Expose()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  password: string;
  @Expose()
  id: string;
}
