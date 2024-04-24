import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from './naming-strategy.config';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Place } from 'src/modules/place/entities/place.entity';
import { Reservation } from 'src/modules/reservation/entities/reservation.entity';

config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_SYNC } =
  process.env;

const entities = [Admin, User, Payment, Place, Reservation];

const dbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  entities,
  synchronize: DB_SYNC == '1',
  logger: 'advanced-console',
  logging: ['error', 'warn'],
  maxQueryExecutionTime: 1000,
};
export default dbConfig;
