import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { HttpError } from 'src/common/exception/http.error';
import { Repository } from 'typeorm';
import { RefreshAdminDto } from '../dto/refresh-admin.dto';
import { Admin } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RefreshAdminUseCase {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}

  async execute(dto: RefreshAdminDto) {
    try {
      const token = dto.refresh_token;
      const adminData = verify(token, process.env.REFRESH_TOKEN_SECRET);
      if (!adminData) {
        HttpError({ code: 'LOGIN_FAILED' });
      }

      const admin = await this.adminRepo.findOne({
        where: { id: Number(adminData['id']) },
      });

      if (!admin) {
        HttpError({ code: 'ADMIN_NOT_FOUND' });
      }

      const isRefTokenMatch = await compare(
        dto.refresh_token,
        admin.refresh_token,
      );

      if (!isRefTokenMatch) {
        HttpError({ code: 'WRONG_REFRESH_TOKEN' });
      }

      const [access_token] = await Promise.all([
        sign({ id: admin.id, role: 'admin' }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '2h',
        }),
      ]);

      return { ...admin, access_token: access_token };
    } catch (error) {
      if (error.message == 'invalid token') {
        HttpError({ code: 'INVALID_JWT' });
      }
      if (error.message == 'jwt expired') {
        HttpError({ code: 'JWT_EXPIRED' });
      }
      if (error.message == 'invalid signature') {
        HttpError({ code: 'INVALID_SIGNATURE' });
      }
      throw error;
    }
  }
}
