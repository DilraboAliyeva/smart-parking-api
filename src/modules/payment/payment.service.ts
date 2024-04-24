import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Reservation } from '../reservation/entities/reservation.entity';
import { HttpError } from 'src/common/exception/http.error';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const reservation = await this.reservationRepo.findOne({
      where: { id: createPaymentDto.reservation_id },
    });
    if (!reservation) {
      return HttpError({
        message: 'RESERVATION_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return await this.paymentRepo.save(
      this.paymentRepo.create({ reservation }),
    );
  }

  async findAll() {
    return await this.paymentRepo.find();
  }

  async findOne(id: number) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) {
      return HttpError({
        message: 'PAYMENT_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) {
      return HttpError({
        message: 'PAYMENT_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    for (const key in payment) {
      if (Object.prototype.hasOwnProperty.call(updatePaymentDto, key)) {
        payment[key] = updatePaymentDto[key];
      }
    }
    return await this.paymentRepo.save(payment);
  }

  async remove(id: number) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) {
      return HttpError({
        message: 'PAYMENT_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return await this.paymentRepo.remove(payment);
  }
}
