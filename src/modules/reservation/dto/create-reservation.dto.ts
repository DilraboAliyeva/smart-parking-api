import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ title: 'from', type: Date, default: new Date() })
  @IsNotEmpty()
  @IsDateString()
  from: Date;

  @ApiProperty({ title: 'user_id', type: Number, default: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  user_id: number;

  @ApiProperty({ title: 'place_id', type: Number, default: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  place_id: number;
}
