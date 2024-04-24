import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { HttpError } from 'src/common/exception/http.error';
import { Repository } from 'typeorm';
import { LoginAdminDto } from '../dto/login-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { decrypt } from 'src/common/utils/hash/hashing.utils';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class LoginAdminUseCase {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}

  async execute(dto: LoginAdminDto) {
    try {
      const admin = await this.adminRepo.findOne({
        where: { username: dto.username },
      });
      if (!admin) {
        return HttpError({ code: 'ADMIN_NOT_FOUND' });
      }

      // const passwordMatch = compareSync(dto.password, admin.password);
      const passwordMatch = dto.password === decrypt(admin.password);
      if (!passwordMatch) {
        HttpError({ code: 'WRONG_PASSWORD' });
      }

      const [access_token, refresh_token] = [
        sign(
          { id: admin.id, role: admin.type },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '2h',
          },
        ),
        sign(
          { id: admin.id, role: admin.type },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '1d',
          },
        ),
      ];

      await this.adminRepo.update(
        { id: admin.id },
        {
          refresh_token: await hash(refresh_token, 10),
          updated_at: new Date(),
        },
      );

      return {
        ...admin,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch (error) {
      throw error;
    }
  }
}
