import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/common/responce/core.responce';
import { DecoratorWrapper } from 'src/common/auth/decorator.wrapper';
import { Role } from 'src/common/auth/roles/role.enum';

@ApiTags('PAYMENT')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @DecoratorWrapper('Create payment', true, [Role.User])
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const result = await this.paymentService.create(createPaymentDto);
      return CoreApiResponse.success(HttpStatus.CREATED, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get all payment', true, [Role.Admin])
  @Get()
  async findAll() {
    try {
      const result = await this.paymentService.findAll();
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get by id payment', true, [Role.Admin, Role.User])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.paymentService.findOne(+id);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Update payment', true, [Role.Admin, Role.User])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      const result = await this.paymentService.update(+id, updatePaymentDto);
      return CoreApiResponse.success(HttpStatus.ACCEPTED, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Delete payment', true, [Role.Admin])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.paymentService.remove(+id);
      return CoreApiResponse.success(HttpStatus.NO_CONTENT, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }
}
