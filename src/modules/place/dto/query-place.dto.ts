import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class GetQueryPlaceDto {
  @ApiPropertyOptional({ title: 'is_empty', type: Boolean })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_empty?: boolean;
}
