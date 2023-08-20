import { Injectable } from '@nestjs/common';
import { Like, Repository, In } from 'typeorm';
import { GetAdminQueryDto } from '../dto/get-admin-query.dto';
import { Admin } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetAllAdminUseCase {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}

  async execute(query: GetAdminQueryDto) {
    try {
      const { limit, page, order, type, username } = query;

      const [result, total] = await this.adminRepo.findAndCount({
        where: {
          username: Like(`%${username || ''}%`),
          type: type || In(['admin', 'laborator', 'operator']),
        },
        skip: ((page || 1) - 1) * (limit || 10),
        take: limit || 10,
      });

      return {
        total,
        page: +page || 1,
        limit: +limit || 10,
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }
}
