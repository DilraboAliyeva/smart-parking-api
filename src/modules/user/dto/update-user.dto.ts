import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    title: 'first_name',
    type: String,
    default: 'first_name',
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({
    title: 'last_name',
    type: String,
    default: 'last_name',
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({
    title: 'phone_number',
    type: String,
    default: '+998901234567',
  })
  @IsOptional()
  @IsString()
  phone_number?: string;
}
