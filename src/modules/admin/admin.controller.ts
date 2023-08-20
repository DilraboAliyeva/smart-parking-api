import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Req,
  Query,
  Delete,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationGuard } from 'src/common/auth/auth.guard';
import { Role } from 'src/common/auth/roles/role.enum';
import { Roles } from 'src/common/auth/roles/roles.decorator';
import { HttpError } from 'src/common/exception/http.error';
import { CoreApiResponse } from 'src/common/responce/core.responce';
import { CreateAdminDto } from './dto/create-admin.dto';
import { GetAdminQueryDto } from './dto/get-admin-query.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RefreshAdminDto } from './dto/refresh-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminUseCase } from './use-cases/create.usecase';
import { DeleteAdminUseCase } from './use-cases/delete.usecase';
import { GetAllAdminUseCase } from './use-cases/getAll.usecase';
import { GetOneAdminUseCase } from './use-cases/getOne.usecase';
import { LoginAdminUseCase } from './use-cases/login.usecase';
import { LogoutAdminUseCase } from './use-cases/logout.usecase';
import { RefreshAdminUseCase } from './use-cases/refresh.usecase';
import { UpdateAdminUseCase } from './use-cases/update.usecase';
import { DecoratorWrapper } from 'src/common/auth/decorator.wrapper';

@ApiTags('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly createAdmin: CreateAdminUseCase,
    private readonly loginAdmin: LoginAdminUseCase,
    private readonly refreshAdmin: RefreshAdminUseCase,
    private readonly logoutAdmin: LogoutAdminUseCase,
    private readonly getOneAdmin: GetOneAdminUseCase,
    private readonly getAllAdmin: GetAllAdminUseCase,
    private readonly deleteAdmin: DeleteAdminUseCase,
    private readonly updateAdmin: UpdateAdminUseCase,
  ) {}

  //Login
  @DecoratorWrapper('Admin Login', false)
  @Post('login')
  async login(@Body() dto: LoginAdminDto) {
    try {
      return CoreApiResponse.success(201, await this.loginAdmin.execute(dto));
    } catch (error) {
      HttpError(error);
    }
  }

  //Refresh
  @DecoratorWrapper('Admin Refresh', false)
  @Post('refresh')
  async refresh(@Body() dto: RefreshAdminDto) {
    try {
      return CoreApiResponse.success(201, await this.refreshAdmin.execute(dto));
    } catch (error) {
      HttpError(error);
    }
  }

  // //Logout
  @DecoratorWrapper('Admin Logout', true, [Role.Admin])
  @Post('logout')
  async logout(@Req() req: Request) {
    try {
      return CoreApiResponse.success(
        201,
        await this.logoutAdmin.execute(req['user']['id']),
      );
    } catch (error) {
      HttpError(error);
    }
  }

  //Create
  @DecoratorWrapper('Create Admin', true, [Role.Admin])
  @Post()
  async create(@Body() dto: CreateAdminDto) {
    try {
      return CoreApiResponse.success(201, await this.createAdmin.execute(dto));
    } catch (error) {
      HttpError(error);
    }
  }

  // Get All
  @DecoratorWrapper('Get All Admin', true, [Role.Admin])
  @Get()
  async getAll(@Query() queryDto: GetAdminQueryDto) {
    try {
      return CoreApiResponse.success(
        200,
        await this.getAllAdmin.execute(queryDto),
      );
    } catch (error) {
      HttpError(error);
    }
  }

  //Get One
  @DecoratorWrapper('Get One Admin', true, [Role.Admin])
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return CoreApiResponse.success(200, await this.getOneAdmin.execute(id));
    } catch (error) {
      HttpError(error);
    }
  }

  //Delete
  @DecoratorWrapper('Delete Admin', true, [Role.Admin])
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return CoreApiResponse.success(200, await this.deleteAdmin.delete(id));
    } catch (error) {
      HttpError(error);
    }
  }

  //Update
  @DecoratorWrapper('Update  Admin', true, [Role.Admin])
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAdminDto,
  ) {
    try {
      const result = await this.updateAdmin.update(id, dto);
      return CoreApiResponse.success(200, result);
    } catch (error) {
      HttpError(error);
    }
  }
}
