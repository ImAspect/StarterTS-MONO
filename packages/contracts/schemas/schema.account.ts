import { z } from 'zod'

export const AccountSchema = z.object({
  id: z.number(),
  userName: z.string(),
  password: z.string(),
  email: z.string(),
  emailCode: z.string(),
  emailVerified: z.boolean(),
  profilePicture: z.string(),
  createdAt: z.date(),
  modifiedAt: z.date(),
})
