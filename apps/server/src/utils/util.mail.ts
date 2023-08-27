import nodemailer from 'nodemailer'
import { env } from './util.env'

export async function mail(to: string, subject: string, text: string) {
  const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.MAIL_USERNAME,
      pass: env.MAIL_PASSWORD,
    },
  })

  const details = {
    from: env.MAIL_USERNAME,
    to: to,
    subject: subject,
    text: text,
  }

  return mailTransporter.sendMail(details)
}
