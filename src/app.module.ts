import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './common/database/orm.config';
import { TemplateModule } from './modules/template/template.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AdminModule, TemplateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
