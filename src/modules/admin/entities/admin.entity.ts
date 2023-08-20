import { AbstractEntity } from 'src/common/entity/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Admin extends AbstractEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin'],
  })
  type: 'admin';

  @Column({ nullable: true })
  refresh_token: string;
}
