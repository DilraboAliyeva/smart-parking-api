import { HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { HttpError } from 'src/common/exception/http.error';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { Admin } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { decrypt, encrypt } from 'src/common/utils/hash/hashing.utils';

@Injectable()
export class UpdateAdminUseCase {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async update(id: number, dto: UpdateAdminDto) {
    try {
      const admin = await this.adminRepo.findOne({ where: { id } });
      if (!admin) return HttpError({ code: 'ADMIN_NOT_FOUND' });

      for (const key in admin) {
        if (Object.prototype.hasOwnProperty.call(dto, key))
          admin[key] = dto[key];
      }

      if (dto.old_password) {
        const isVerfied = decrypt(admin.password) == dto.old_password;
        if (!isVerfied)
          HttpError({
            message: 'WRONG_OLD_PASSWORD',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        if (!dto.confirm_password || !dto.new_password)
          HttpError({
            message: 'NO_CONFIRM_OR_NEW_PASSWORD',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        admin['password'] = encrypt(dto.new_password);
      }

      if (dto.username && dto.username !== admin.username) {
        const busyUsername = await this.adminRepo.findOne({
          where: { username: dto.username },
        });
        if (busyUsername)
          HttpError({
            message: 'BUSY_USERNAME',
            statusCode: HttpStatus.BAD_REQUEST,
          });
      }

      if (dto.new_password && !dto.old_password) {
        HttpError({
          message: 'ENTER_OLD_PASSWORD',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      admin.updated_at = Date.now();

      return await this.adminRepo.save(admin);
    } catch (error) {
      HttpError(error);
    }
  }
}
