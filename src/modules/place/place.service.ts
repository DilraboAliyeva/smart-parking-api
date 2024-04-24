import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';
import { HttpError } from 'src/common/exception/http.error';
import { GetQueryPlaceDto } from './dto/query-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private readonly placeRepo: Repository<Place>,
  ) {}
  async create(createPlaceDto: CreatePlaceDto) {
    const placeData = {
      name: createPlaceDto.name,
      price: createPlaceDto.price,
      is_empty: true,
    };
    return await this.placeRepo.save(placeData);
  }

  async findAll(query: GetQueryPlaceDto) {
    return await this.placeRepo.find({ where: { is_empty: query.is_empty } });
  }

  async findOne(id: number) {
    const place = await this.placeRepo.findOne({ where: { id } });
    if (!place) {
      return HttpError({
        message: 'PLACE_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return place;
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    try {
      const place = await this.placeRepo.findOne({ where: { id } });
      if (!place) {
        return HttpError({
          message: 'PLACE_NOT_FOUND',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      place.is_empty = updatePlaceDto.is_empty || place.is_empty;
      return await this.placeRepo.save(place);
    } catch (error) {
      return HttpError(error);
    }
  }

  async remove(id: number) {
    try {
      const place = await this.placeRepo.findOne({ where: { id } });
      if (!place) {
        return HttpError({
          message: 'PLACE_NOT_FOUND',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      return await this.placeRepo.remove(place);
    } catch (error) {
      return HttpError(error);
    }
  }
}
