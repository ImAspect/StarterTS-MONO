import { authContract as Auth, accountContract as Account } from '@starterts/contracts'
import { generateOpenApi } from '@ts-rest/open-api'
import { env } from './util.env'

export const openApiDocument = generateOpenApi(
  { Auth, Account },
  {
    info: {
      title: env.API_NAME,
      description: 'Independent project by @1m4sp3ct',
      version: env.API_VERSION,
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    tags: [
      { name: 'Auth', description: 'Endpoints AuthAPI' },
      { name: 'Account', description: 'Endpoints AccountAPI' },
    ],
  },
  { setOperationId: true, jsonQuery: true }
)
