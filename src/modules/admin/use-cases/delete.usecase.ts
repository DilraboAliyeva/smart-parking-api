import { Injectable } from '@nestjs/common';
import { HttpError } from 'src/common/exception/http.error';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteAdminUseCase {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async delete(id: number) {
    try {
      const admin = await this.adminRepo.findOne({ where: { id } });
      if (!admin) HttpError({ code: 'ADMIN_NOT_FOUND' });
      return await this.adminRepo.remove(admin);
    } catch (error) {
      throw error;
    }
  }
}
