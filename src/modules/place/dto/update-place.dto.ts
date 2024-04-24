import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePlaceDto {
  @ApiPropertyOptional({ title: 'is_empty', type: Boolean, default: true })
  @IsOptional()
  @IsBoolean()
  is_empty?: boolean;
}
