import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from '../entity/template.entity';
import { Repository } from 'typeorm';
import { HttpError } from 'src/common/exception/http.error';
import { CreateTemplateDto } from '../dto/create.dto';

@Injectable()
export class CreateTemplateUseCase {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepo: Repository<Template>,
  ) {}

  async execute(dto: CreateTemplateDto) {
    try {
      return;
    } catch (error) {
      HttpError(error);
    }
  }
}
