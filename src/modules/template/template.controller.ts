import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTemplateUseCase } from './use-cases/create.usecase';
import { GetAllTemplateUseCase } from './use-cases/get-all.usecase';
import { GetOneTemplateUseCase } from './use-cases/get-one.usecase';
import { DeleteTemplateUseCase } from './use-cases/delete.usecase';
import { UpdateTemplateUseCase } from './use-cases/update.usecase';
import { CreateTemplateDto } from './dto/create.dto';
import { CoreApiResponse } from 'src/common/responce/core.responce';
import { TemplateGetQueryDto } from './dto/get-query.dto';
import { UpdateTemplateDto } from './dto/update.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.wrapper';
import { Role } from 'src/common/auth/roles/role.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TEMPLATE')
@Controller('template')
export class TemplateController {
  constructor(
    private readonly createUseCase: CreateTemplateUseCase,
    private readonly updateUseCase: UpdateTemplateUseCase,
    private readonly deleteUseCase: DeleteTemplateUseCase,
    private readonly getOneUseCase: GetOneTemplateUseCase,
    private readonly getAllUseCase: GetAllTemplateUseCase,
  ) {}

  @DecoratorWrapper('Create Template', true, [Role.Admin])
  @Post('')
  async create(@Body() dto: CreateTemplateDto) {
    try {
      const result = await this.createUseCase.execute(dto);
      return CoreApiResponse.success(HttpStatus.CREATED, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get All Template', false)
  @Get('')
  async getAll(@Query() queryDto: TemplateGetQueryDto) {
    try {
      const result = await this.getAllUseCase.execute(queryDto);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get One Template', false)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.getOneUseCase.execute(id);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Delete Template', true, [Role.Admin])
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.deleteUseCase.execute(id);
      return CoreApiResponse.success(HttpStatus.NO_CONTENT);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Update Template', true, [Role.Admin])
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTemplateDto,
  ) {
    try {
      const result = await this.updateUseCase.execute(id, dto);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }
}
