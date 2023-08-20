import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpError } from 'src/common/exception/http.error';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class LogoutAdminUseCase {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}

  async execute(id: number) {
    try {
      const admin = await this.adminRepo.findOneBy({ id });
      if (!admin) HttpError({ code: 'ADMIN_NOT_FOUND' });

      admin.refresh_token = null;
      await this.adminRepo.save(admin);
      return { ...admin };
    } catch (error) {
      throw error;
    }
  }
}
