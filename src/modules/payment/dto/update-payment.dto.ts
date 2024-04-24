import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({ title: 'is_paid', type: Boolean, default: true })
  @IsOptional()
  @IsBoolean()
  is_paid?: boolean;
}
