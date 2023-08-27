import { env } from './utils/util.env'
import app from './index'
import { ORM } from './orm/orm.index'

app.listen(process.env.API_PORT as unknown as number, async () => {
  ORM.initialize()
    .then(() =>
      console.log(
        'Database connection successful.\nListening on port [' +
          env.API_PORT +
          ']'
      )
    )
    .catch((err) => {
      console.error("Couldn't connect to database", err)
      process.exit(1)
    })
})
