import { JsonResponse } from '../types/type.misc'
import { authClient } from '../utils/util.clients'
import { accountStore } from '../stores/store.account'
import uidContext from '../contexts/context.uid'
import { useContext, useEffect } from 'react'

const useAuth = (): Promise<JsonResponse> => {
    return new Promise((resolve, reject) => {
        const uid = useContext(uidContext)
        const [login] = accountStore((state) => [state.login])

        useEffect(() => {
            authClient.checkToken()
                .then((res) => {
                    if (res.status === 200) {
                        login(res.body.data)
                        resolve({
                            status: res.status,
                            body: {
                                msg: res.body.msg,
                                data: res.body.data
                            }
                        })
                    }
                })
        }, [uid])
    })
}

export { useAuth }