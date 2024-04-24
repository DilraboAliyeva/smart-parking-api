import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @ApiPropertyOptional({ title: 'to', type: Date, default: new Date() })
  @IsOptional()
  @IsDate()
  to: Date;
}
