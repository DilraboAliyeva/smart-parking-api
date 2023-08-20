import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { CreateAdminUseCase } from './use-cases/create.usecase';
import { DeleteAdminUseCase } from './use-cases/delete.usecase';
import { GetAllAdminUseCase } from './use-cases/getAll.usecase';
import { GetOneAdminUseCase } from './use-cases/getOne.usecase';
import { LoginAdminUseCase } from './use-cases/login.usecase';
import { LogoutAdminUseCase } from './use-cases/logout.usecase';
import { RefreshAdminUseCase } from './use-cases/refresh.usecase';
import { UpdateAdminUseCase } from './use-cases/update.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [
    LoginAdminUseCase,
    RefreshAdminUseCase,
    LogoutAdminUseCase,
    CreateAdminUseCase,
    GetOneAdminUseCase,
    DeleteAdminUseCase,
    UpdateAdminUseCase,
    GetAllAdminUseCase,
  ],
})
export class AdminModule {}
