import { Account } from 'entities/entity.account'

type ResponseBase<S extends number> = {
  status: S
  msg: string
}

type ValidResponse = {
  data: any
} & ResponseBase<200>

type InvalidResponse = ResponseBase<400>

type ConflictResponse = ResponseBase<409>

export type ServiceResponse = ValidResponse | InvalidResponse | ConflictResponse
