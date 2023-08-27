import { initServer } from '@ts-rest/express'
import JWT from 'jsonwebtoken'
import { authContract } from '@starterts/contracts'
import { env } from '../utils/util.env'
import { ORM } from '../orm/orm.index'
import { Account } from '../entities/entity.account'

const server = initServer()

export const authRouter = server.router(authContract, {
  checkToken: {
    middleware: [
      (req, res, next) => {
        JWT.verify(
          req.cookies[`${env.AUTH_COOKIE}`],
          env.AUTH_SECRET as string,
          (err: JWT.VerifyErrors | null, token: any) => {
            if (token) {
              req.headers.id = token.id
            } else {
              req.headers.id = '0'
            }

            next()
          }
        )
      },
    ],
    handler: async (req) => {
      if (!req.headers.id) {
        return {
          status: 409,
          body: {
            msg: 'Error: Bad token',
          },
        }
      } else {
        const account = await ORM.getRepository(Account)
          .createQueryBuilder('account')
          .where('account.id = :id', { id: req.headers.id })
          .getOne()

        if (account === null || Number(req.headers.id) === 0)
          return {
            status: 400,
            body: {
              msg: 'Error : Invalid data',
            },
          }

        return {
          status: 200,
          body: {
            msg: 'Success: Great token',
            data: account,
          },
        }
      }
    },
  },
})
