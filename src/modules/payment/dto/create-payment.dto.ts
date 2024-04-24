import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ title: 'reservation_id', type: Number, default: 1 })
  @IsNotEmpty()
  @IsNumber()
  reservation_id: number;
}
