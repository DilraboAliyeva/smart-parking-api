import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    title: 'phone_number',
    type: String,
    default: '+998901234567',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @ApiProperty({
    title: 'password',
    type: String,
    default: 'password',
  })
  @IsString()
  password: string;
}
