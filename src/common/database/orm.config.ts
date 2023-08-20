import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from './naming-strategy.config';
import { Template } from 'src/modules/template/entity/template.entity';
import { Admin } from 'src/modules/admin/entities/admin.entity';

config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_SYNC } =
  process.env;

const entities = [Admin, Template];

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
  cache: {
    duration: 60000,
    type: 'database',
  },
};
export default dbConfig;
