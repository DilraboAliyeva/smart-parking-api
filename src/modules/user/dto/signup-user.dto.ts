import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @ApiProperty({ title: 'full_name', type: String, default: 'full_name' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    title: 'phone_number',
    type: String,
    default: '+998901234567',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ title: 'password', type: String, default: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ title: 'confirm_password', type: String, default: 'password' })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
