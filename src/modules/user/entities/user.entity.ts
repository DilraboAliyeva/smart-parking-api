import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Reservation } from 'src/modules/reservation/entities/reservation.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class User extends AbstractEntity {
  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ nullable: true })
  refresh_token: string;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.user)
  reservations: Reservation[];
}
