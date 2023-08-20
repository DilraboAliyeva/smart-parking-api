import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Role } from 'src/common/auth/roles/role.enum';

export class UpdateAdminDto {
  @ApiPropertyOptional({
    description: "Admin's username",
    type: 'string',
    title: 'username',
  })
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    description: "Admin's password",
    type: 'string',
    title: 'password',
  })
  @IsOptional()
  old_password?: string;

  @ApiPropertyOptional({
    description: 'New password',
    type: 'string',
    title: 'password',
  })
  @IsOptional()
  new_password?: string;

  @ApiPropertyOptional({
    description: 'Confirm password',
    type: 'string',
    title: 'password',
  })
  @IsOptional()
  confirm_password?: string;

  @ApiPropertyOptional({
    description: "Admin's role",
    type: 'string',
    title: 'role',
  })
  @IsOptional()
  type?: Role;
}
