import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Entity } from 'typeorm';

@Entity('template')
export class Template extends AbstractEntity {}
