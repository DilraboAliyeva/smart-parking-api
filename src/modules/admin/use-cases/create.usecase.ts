import { Injectable } from '@nestjs/common';
import { HttpError } from 'src/common/exception/http.error';
import { Repository } from 'typeorm';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { Admin } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encrypt } from 'src/common/utils/hash/hashing.utils';

@Injectable()
export class CreateAdminUseCase {
  constructor(
    @InjectRepository(Admin) private readonly adminrepo: Repository<Admin>,
  ) {}

  async execute(dto: CreateAdminDto) {
    try {
      const busyUsername = await this.adminrepo.findOne({
        where: { username: dto.username },
      });
      if (busyUsername) {
        HttpError({ code: 'BUSY_USERNAME' });
      }

      const admin = this.adminrepo.create({
        username: dto.username,
        password: encrypt(dto.password),
        type: dto.type,
        created_at: Date.now(),
        updated_at: Date.now(),
      });

      return await this.adminrepo.save(admin);
    } catch (error) {
      throw error;
    }
  }
}
