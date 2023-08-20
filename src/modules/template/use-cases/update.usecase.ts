import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from '../entity/template.entity';
import { Repository } from 'typeorm';
import { HttpError } from 'src/common/exception/http.error';
import { UpdateTemplateDto } from '../dto/update.dto';

@Injectable()
export class UpdateTemplateUseCase {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepo: Repository<Template>,
  ) {}

  async execute(id: number, dto: UpdateTemplateDto) {
    try {
      return;
    } catch (error) {
      HttpError(error);
    }
  }
}
