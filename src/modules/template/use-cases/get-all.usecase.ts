import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from '../entity/template.entity';
import { Repository } from 'typeorm';
import { HttpError } from 'src/common/exception/http.error';
import { TemplateGetQueryDto } from '../dto/get-query.dto';

@Injectable()
export class GetAllTemplateUseCase {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepo: Repository<Template>,
  ) {}

  async execute(dto: TemplateGetQueryDto) {
    try {
      return;
    } catch (error) {
      HttpError(error);
    }
  }
}
