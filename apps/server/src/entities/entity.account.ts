import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Account extends BaseEntity {
  constructor(
    id: number,
    userName: string,
    password: string,
    email: string,
    emailCode: string,
    emailVerified: boolean,
    profilePicture: string,
    createdAt: Date,
    modifiedAt: Date
  ) {
    super()
    this.id = id
    this.userName = userName
    this.password = password
    this.email = email
    this.emailCode = emailCode
    this.emailVerified = emailVerified
    this.profilePicture = profilePicture
    this.createdAt = createdAt
    this.modifiedAt = modifiedAt
  }

  @PrimaryGeneratedColumn()
  id

  @Column('varchar', { nullable: false })
  userName

  @Column('varchar', { nullable: false })
  password

  @Column('varchar', { nullable: false })
  email

  @Column('varchar', { nullable: true })
  emailCode

  @Column('boolean', { nullable: false, default: false })
  emailVerified

  @Column('varchar', { nullable: false, default: 'default.jpg' })
  profilePicture

  @Column('datetime', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt

  @Column('datetime', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  modifiedAt
}
