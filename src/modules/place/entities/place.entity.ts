import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Reservation } from 'src/modules/reservation/entities/reservation.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('place')
export class Place extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'boolean', default: true })
  is_empty: boolean;

  @Column()
  price: number;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.place)
  reservations: Reservation[];
}
