import { Account } from 'entities/entity.account'
import { DataSource } from 'typeorm'
import { env } from 'utils/util.env'

export const ORM = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: true,
  logging: env.NODE_ENV === 'developement',
  entities: [Account],
  subscribers: [],
  migrations: [],
})
