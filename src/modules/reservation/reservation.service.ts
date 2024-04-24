import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Place } from '../place/entities/place.entity';
import { HttpError } from 'src/common/exception/http.error';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservRepo: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const user = await this.userRepo.findOne({
      where: { id: createReservationDto.user_id },
    });
    if (!user) {
      return HttpError({
        message: 'USER_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    const place = await this.placeRepo.findOne({
      where: { id: createReservationDto.place_id },
    });
    if (!place) {
      return HttpError({
        message: 'PLACE_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return await this.reservRepo.save(
      this.reservRepo.create({ from: createReservationDto.from, user, place }),
    );
  }

  async findAll() {
    return await this.reservRepo.find();
  }

  async findOne(id: number) {
    const reservation = await this.reservRepo.findOne({ where: { id } });
    if (!reservation) {
      return HttpError({
        message: 'RESERVATION_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservRepo.findOne({ where: { id } });
    if (!reservation) {
      return HttpError({
        message: 'RESERVATION_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    for (const key in updateReservationDto) {
      if (Object.prototype.hasOwnProperty.call(reservation, key)) {
        reservation[key] = updateReservationDto[key];
      }
    }
    return await this.reservRepo.save(reservation);
  }

  async remove(id: number) {
    const reservation = await this.reservRepo.findOne({ where: { id } });
    if (!reservation) {
      return HttpError({
        message: 'RESERVATION_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.reservRepo.remove(reservation);
  }
}
