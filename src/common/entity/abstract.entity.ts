import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint')
  created_at: number;

  @Column('bigint', { nullable: true })
  updated_at: number;
}
