import dotenv from 'dotenv'
import z from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z
    .union([z.literal('production'), z.literal('developement')])
    .default('developement'),
  API_PORT: z.string().transform(Number),
  API_NAME: z.string(),
  API_VERSION: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform(Number),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  MAIL_USERNAME: z.string(),
  MAIL_PASSWORD: z.string(),
  AUTH_COOKIE: z.string(),
  AUTH_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
