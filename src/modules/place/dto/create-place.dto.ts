import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({ title: 'name', type: String, default: 'Place 1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ title: 'price', type: Number, default: 10000 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;
}
