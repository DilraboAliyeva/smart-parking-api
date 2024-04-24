import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Reservation } from 'src/modules/reservation/entities/reservation.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('payment')
export class Payment extends AbstractEntity {
  @Column({ type: 'boolean', default: false })
  is_paid: boolean;

  @Column()
  total: number;

  @Column()
  reservation_id: number;

  @OneToOne(
    () => Reservation,
    (reservation: Reservation) => reservation.payment,
  )
  @JoinColumn({ name: 'reservation_id', referencedColumnName: 'id' })
  reservation: Reservation;

  @BeforeInsert()
  private _$() {
    const timeMilli =
      this.reservation.to.getTime() - this.reservation.from.getTime();
    const timeHours = (timeMilli / (1000 * 60 * 60)).toFixed(2);
    this.total = +timeHours * this.reservation.place.price;
  }
}
