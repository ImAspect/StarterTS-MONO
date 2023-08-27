import { initClient } from "@ts-rest/core"
import { accountContract, authContract } from "@starterts/contracts"

export const authClient = initClient(authContract, {
    baseUrl: 'http://localhost:4000',
    baseHeaders: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
})

export const accountClient = initClient(accountContract, {
    baseUrl: 'http://localhost:4000',
    baseHeaders: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
})