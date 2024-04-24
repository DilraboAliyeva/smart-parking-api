import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from '../user/entities/user.entity';
import { Place } from '../place/entities/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Place])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
