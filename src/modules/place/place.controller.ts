import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiTags } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/common/responce/core.responce';
import { GetQueryPlaceDto } from './dto/query-place.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.wrapper';
import { Role } from 'src/common/auth/roles/role.enum';

@ApiTags('PLACE')
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @DecoratorWrapper('Create place', true, [Role.Admin])
  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      const result = await this.placeService.create(createPlaceDto);
      return CoreApiResponse.success(HttpStatus.CREATED, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get all place', false)
  @Get()
  async findAll(@Query() query: GetQueryPlaceDto) {
    try {
      const result = await this.placeService.findAll(query);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get by id place', false)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.placeService.findOne(+id);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Update place', true, [Role.Admin])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    try {
      const result = await this.placeService.update(+id, updatePlaceDto);
      return CoreApiResponse.success(HttpStatus.ACCEPTED, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Delete place', true, [Role.Admin])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.placeService.remove(+id);
      return CoreApiResponse.success(HttpStatus.NO_CONTENT, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }
}
