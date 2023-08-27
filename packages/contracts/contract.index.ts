import { initContract } from '@ts-rest/core'
import { z } from 'zod'
import { AccountSchema } from './schemas/schema.account'

const c = initContract()

export const authContract = c.router(
  {
    checkToken: {
      method: 'GET',
      path: '/api/auth/checkToken',
      responses: {
        200: z.object({
          msg: z.string(),
          data: AccountSchema,
        }),
        400: z.object({
          msg: z.string(),
        }),
        409: z.object({
          msg: z.string(),
        }),
      },
      summary: 'Check authentification web token',
    },
  }
)

export const accountContract = c.router(
  {
    createStep1: {
      method: 'POST',
      path: '/api/account/create',
      responses: {
        200: z.object({
          msg: z.string(),
          data: AccountSchema
        }),
        400: z.object({
          msg: z.string(),
        }),
        409: z.object({
          msg: z.string(),
        }),
      },
      body: z.object({
        userName: z.string(),
        password: z.string(),
        passwordConfirmation: z.string(),
        email: z.string(),
        emailConfirmation: z.string()
      }),
      summary: 'Create a account',
    },
    createStep2: {
      method: 'PUT',
      path: '/api/account/email/verify/:id',
      pathParams: z.object({
        id: z.string()
      }),
      responses: {
        200: z.object({
          msg: z.string(),
          data: AccountSchema
        }),
        400: z.object({
          msg: z.string()
        }),
        409: z.object({
          msg: z.string()
        }),
      },
      body: z.object({
        code: z.string()
      }),
      summary: 'Account email verification',
    },
    login: {
      method: 'POST',
      path: '/api/account/login',
      responses: {
        200: z.object({
          msg: z.string(),
          data: AccountSchema
        }),
        400: z.object({
          msg: z.string()
        }),
        409: z.object({
          msg: z.string()
        })
      },
      body: z.object({
        userName: z.string(),
        password: z.string()
      }),
      summary: 'Loggin a account'
    },
    logout: {
      method: 'GET',
      path: '/api/account/logout',
      responses: {
        200: z.object({
          msg: z.string()
        }),
        400: z.object({
          msg: z.string()
        }),
        409: z.object({
          msg: z.string()
        })
      },
      summary: 'Loggout a account'
    }
  }
)