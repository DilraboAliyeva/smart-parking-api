import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpError } from 'src/common/exception/http.error';
import { LoginUserDto } from './dto/login-user.dto';
import { decrypt, encrypt } from 'src/common/utils/hash/hashing.utils';
import { sign } from 'jsonwebtoken';
import { Role } from 'src/common/auth/roles/role.enum';
import { hash } from 'bcryptjs';
import { SignupUserDto } from './dto/signup-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async login(loginDto: LoginUserDto) {
    try {
      const user = await this.userRepo.findOne({
        where: { phone_number: loginDto.phone_number },
      });
      if (!user) {
        return HttpError({
          message: 'USER_NOT_FOUND',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      const passwordMatch = loginDto.password === decrypt(user.password);
      if (!passwordMatch) {
        HttpError({ code: 'WRONG_PASSWORD' });
      }
      const [access_token] = [
        sign(
          { id: user.id, role: Role.User },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '2h',
          },
        ),
      ];

      await this.userRepo.update(
        { id: user.id },
        {
          updated_at: new Date(),
        },
      );
      return { ...user, password: undefined, access_token };
    } catch (error) {
      return HttpError(error);
    }
  }

  async signup(signupDto: SignupUserDto) {
    try {
      const loginExist = await this.userRepo.findOne({
        where: { phone_number: signupDto.phone_number },
      });
      if (loginExist) {
        return HttpError({
          message: 'PHONE_NUMBER_ALREADY_EXIST',
          statusCode: HttpStatus.FORBIDDEN,
        });
      }

      if (signupDto.password !== signupDto.confirm_password) {
        return HttpError({ message: 'PASSWORDS_NOT_MATCH' });
      }

      const data = {
        full_name: signupDto.full_name,
        phone_number: signupDto.phone_number,
        password: encrypt(signupDto.password),
      };

      return await this.userRepo.save(this.userRepo.create(data));
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const phoneExist = await this.userRepo.findOne({
        where: { phone_number: createUserDto.phone_number },
      });
      if (phoneExist) {
        return HttpError({
          message: 'PHONE_NUMBER_ALREADY_EXIST',
          statusCode: HttpStatus.FORBIDDEN,
        });
      }
      const data = {
        full_name: createUserDto.full_name,
        phone_number: createUserDto.phone_number,
        password: encrypt(createUserDto.password),
      };

      return await this.userRepo.save(this.userRepo.create(data));
    } catch (error) {
      return HttpError(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepo.find({});
    } catch (error) {
      return HttpError(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        return HttpError({
          message: 'USER_NOT_FOUND',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      return user;
    } catch (error) {
      return HttpError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        return HttpError({
          message: 'USER_NOT_FOUND',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      for (const key in updateUserDto) {
        if (Object.prototype.hasOwnProperty.call(user, key)) {
          user[key] = updateUserDto[key];
        }
      }

      return { ...(await this.userRepo.save(user)), password: undefined };
    } catch (error) {
      return HttpError(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        return HttpError({
          message: 'USER_NOT_FOUND',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      return await this.userRepo.remove(user);
    } catch (error) {
      return HttpError(error);
    }
  }
}
