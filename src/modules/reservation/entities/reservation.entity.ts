import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Place } from 'src/modules/place/entities/place.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('reservation')
export class Reservation extends AbstractEntity {
  @Column({ type: 'timestamp' })
  from: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  to: Date;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user: User) => user.reservations)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  place_id: number;

  @ManyToOne(() => Place, (place: Place) => place.reservations)
  @JoinColumn({ name: 'place_id', referencedColumnName: 'id' })
  place: Place;

  @OneToOne(() => Payment, (payment: Payment) => payment.reservation)
  payment: Payment;
}
