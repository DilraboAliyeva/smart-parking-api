import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './entity/template.entity';
import { TemplateController } from './template.controller';
import { CreateTemplateUseCase } from './use-cases/create.usecase';
import { UpdateTemplateUseCase } from './use-cases/update.usecase';
import { DeleteTemplateUseCase } from './use-cases/delete.usecase';
import { GetAllTemplateUseCase } from './use-cases/get-all.usecase';
import { GetOneTemplateUseCase } from './use-cases/get-one.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [
    CreateTemplateUseCase,
    UpdateTemplateUseCase,
    DeleteTemplateUseCase,
    GetAllTemplateUseCase,
    GetOneTemplateUseCase,
  ],
})
export class TemplateModule {}
