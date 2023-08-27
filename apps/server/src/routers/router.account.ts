import { initServer } from '@ts-rest/express'
import { accountContract } from '@starterts/contracts'
import { Account } from '../entities/entity.account'
import { ORM } from '../orm/orm.index'
import accountService from '../services/service.account'
import { env } from '../utils/util.env'
import JWT from 'jsonwebtoken'

const server = initServer()

export const accountRouter = server.router(accountContract, {
  createStep1: async ({ body, res }) => {
    const response = await accountService.createStep1(body)

    switch (response.status) {
      case 200:
        const account = await ORM.getRepository(Account)
          .createQueryBuilder('account')
          .where('account.userName = :userName', { userName: body.userName })
          .getOne()

        if (account !== null) {
          const infos = { id: account.id, username: account.userName }
          const secret = env.AUTH_SECRET
          const token = JWT.sign(infos, secret)
          res.cookie(`${env.AUTH_COOKIE}`, token, {
            httpOnly: true,
            secure: false,
            path: '/',
          })
        }

        return {
          status: response.status,
          body: {
            msg: response.msg,
            data: response.data
          },
        }
      case 400:
        return {
          status: response.status,
          body: {
            msg: response.msg,
          },
        }
      case 409:
        return {
          status: response.status,
          body: {
            msg: response.msg,
          },
        }
    }
  },
  createStep2: async ({ params: { id }, body }) => {
    const response = await accountService.createStep2(body, Number(id))

    switch (response.status) {
      case 200:
        return {
          status: response.status,
          body: {
            msg: response.msg,
            data: response.data
          },
        }
      case 400:
        return {
          status: response.status,
          body: {
            msg: response.msg,
          },
        }
      case 409:
        return {
          status: response.status,
          body: {
            msg: response.msg,
          },
        }
    }
  },
  login: async ({ body, res }) => {
    const response = await accountService.login(body)

    switch (response.status) {
      case 200:
        const account = await ORM.getRepository(Account)
          .createQueryBuilder('account')
          .where('account.userName = :userName', { userName: body.userName })
          .getOne()

        if (account !== null) {
          const infos = { id: account.id, username: account.userName }
          const secret = env.AUTH_SECRET
          const token = JWT.sign(infos, secret)
          res.cookie(`${env.AUTH_COOKIE}`, token, {
            httpOnly: true,
            secure: false,
            path: '/',
          })
        }
        return {
          status: response.status,
          body: {
            msg: response.msg,
            data: response.data
          },
        }
      case 400:
        return {
          status: response.status,
          body: {
            msg: response.msg,
          },
        }
      case 409:
        return {
          status: response.status,
          body: {
            msg: response.msg,
          },
        }
    }
  },
  logout: async ({ res }) => {
    res.clearCookie(env.AUTH_COOKIE)
    return {
      status: 200,
      body: {
        msg: 'Success: Account has been logout'
      }
    }
  }
})
