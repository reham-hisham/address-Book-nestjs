import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
export class addressDto {
  @IsString()
  @ApiProperty()
  address: string;

}
