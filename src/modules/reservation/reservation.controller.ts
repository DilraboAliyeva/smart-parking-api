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
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiTags } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/common/responce/core.responce';
import { DecoratorWrapper } from 'src/common/auth/decorator.wrapper';
import { Role } from 'src/common/auth/roles/role.enum';

@ApiTags('RESERVATION')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @DecoratorWrapper('Create reservation', true, [Role.User])
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      const result = await this.reservationService.create(createReservationDto);
      return CoreApiResponse.success(HttpStatus.CREATED, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get all reservation', true, [Role.Admin])
  @Get()
  async findAll() {
    try {
      const result = this.reservationService.findAll();
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get by id reservation', true, [Role.User, Role.Admin])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = this.reservationService.findOne(+id);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Update reservation', true, [Role.Admin])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    try {
      const result = this.reservationService.update(+id, updateReservationDto);
      return CoreApiResponse.success(HttpStatus.ACCEPTED, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Delete reservation', true, [Role.Admin])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = this.reservationService.remove(+id);
      return CoreApiResponse.success(HttpStatus.NO_CONTENT, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }
}
