import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './common/database/orm.config';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { PlaceModule } from './modules/place/place.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AdminModule,
    UserModule,
    PlaceModule,
    ReservationModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
