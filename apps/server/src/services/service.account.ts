import argon2 from 'argon2'
import { ServiceResponse } from '../utils/util.type'
import { ORM } from '../orm/orm.index'
import { Account } from '../entities/entity.account'
import { codeGenerator } from '../utils/util.codeGenerator'
import { mail } from '../utils/util.mail'

class accountService {
  constructor() { }

  public async createStep1(body: {
    userName: string
    password: string
    passwordConfirmation: string
    email: string
    emailConfirmation: string
  }): Promise<ServiceResponse> {
    if (
      !body.userName ||
      !body.password ||
      !body.passwordConfirmation ||
      !body.email ||
      !body.emailConfirmation
    )
      return {
        status: 400,
        msg: 'Error : Invalid data',
      }

    const userNameExist = await ORM.getRepository(Account)
      .createQueryBuilder('account')
      .where('account.userName = :userName', { userName: body.userName })
      .getOne()

    if (userNameExist !== null)
      return {
        status: 409,
        msg: 'Error : Username is already in use',
      }

    if (!body.userName.match('^[a-z0-9A-Z]{3,16}$'))
      return {
        status: 409,
        msg: 'Error: Username format is invalid',
      }

    if (body.userName.length < 6 || body.userName.length > 16)
      return {
        status: 409,
        msg: 'Error: Username require min 6 and max 16 characters',
      }

    const emailExist = await ORM
      .getRepository(Account)
      .createQueryBuilder('account')
      .where('account.email = :email', { email: body.email })
      .getOne()

    if (emailExist !== null)
      return {
        status: 409,
        msg: 'Error : Email is already in use',
      }

    if (
      !body.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      return {
        status: 409,
        msg: 'Error : Email format is invalid',
      }

    if (body.email !== body.emailConfirmation)
      return {
        status: 409,
        msg: 'Error: Invalid email confirmation',
      }

    if (
      !body.password.match(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*_)(?!.* ).{8,16}$/
      )
    )
      return {
        status: 409,
        msg: 'Error: Password must contain a number from 1 to 9, a lowercase letter, an uppercase letter, an underscore, no spaces and must be between 8 and 16 characters. The use of any other special character other than the underscore is optional.',
      }

    if (body.password !== body.passwordConfirmation)
      return {
        status: 409,
        msg: 'Error: Invalid password confirmation',
      }

    body.password = await argon2.hash(body.password)

    const code = await codeGenerator(6)
    mail(body.email, 'Code de vérification', code)

    ORM.createQueryBuilder()
      .insert()
      .into(Account)
      .values({
        userName: body.userName,
        password: body.password,
        email: body.email,
        emailCode: code,
      })
      .execute()

    const accountData = await ORM
      .getRepository(Account)
      .createQueryBuilder('account')
      .where('account.email = :email', { email: body.email })
      .getOne()

    return {
      status: 200,
      msg: 'Success: Account has been create',
      data: accountData
    }
  }

  public async createStep2(
    body: {
      code: string
    },
    id: number
  ): Promise<ServiceResponse> {
    if (!body.code || !id)
      return {
        status: 400,
        msg: 'Error : Invalid data',
      }

    const account = await ORM.getRepository(Account)
      .createQueryBuilder('account')
      .where('account.id = :id', { id: id })
      .getOne()

    if (account === null) {
      return {
        status: 409,
        msg: 'Error: Account not found',
      }
    }

    if (account.emailVerified === true)
      return {
        status: 409,
        msg: 'Error: Email is already verified',
      }

    const emailCode = account.emailCode

    if (body.code !== emailCode)
      return {
        status: 409,
        msg: 'Error: Verification code is invalid',
      }

    ORM.createQueryBuilder()
      .update(Account)
      .set({ emailVerified: true, emailCode: null })
      .where('id = :id', { id: account.id })
      .execute()

    return {
      status: 200,
      msg: 'Success: Email has been verified',
      data: account
    }
  }

  public async login(
    body: {
      userName: string,
      password: string
    }
  ): Promise<ServiceResponse> {
    if (!body.userName || !body.password)
      return {
        status: 400,
        msg: 'Error : Invalid data',
      }

    const account = await ORM.getRepository(Account)
      .createQueryBuilder('account')
      .where('account.userName = :userName', { userName: body.userName })
      .getOne()

    if (account === null) {
      return {
        status: 409,
        msg: 'Error: Account not found',
      }
    }

    if (!await argon2.verify(account.password, body.password))
      return {
        status: 409,
        msg: 'Error: Bad password'
      }

    return {
      status: 200,
      msg: 'Success: Account has been logged',
      data: account
    }
  }
}

export default new accountService()
