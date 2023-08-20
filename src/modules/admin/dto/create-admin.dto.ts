import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, Matches } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: "Admin's username",
    type: 'string',
    title: 'username',
    default: 'admin',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: "Admin's password",
    type: 'string',
    title: 'password',
    default: 'admin',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "Admin's role",
    type: 'string',
    title: 'role',
    default: 'admin',
  })
  @IsNotEmpty()
  @IsIn(['admin'])
  type: 'admin';
}
