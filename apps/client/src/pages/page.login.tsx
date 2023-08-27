import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { accountClient } from '../utils/util.clients'
import { refresh } from '../utils/util.functions'
import { css } from '../styled-system/css'

const Login = () => {
    const [error, setError] = useState<string | null>(null)
    const [userName, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const loginSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const res = await accountClient.login({
            body: {
                userName: userName,
                password: password
            }
        })

        if (res.status === 200 || res.status === 400 || res.status === 409) {
            setError(res.body.msg)
            if (res.status === 200) return refresh()
        }

    }
    return (
        <>
            <main>
                <title>{import.meta.env.VITE_NAME} - Connexion</title>
                <form onSubmit={loginSubmit} action="#" method="post" className={
                    css({
                        width: '50%',
                        height: 'auto',
                        margin: '0 auto',
                        '& h1': {
                            paddingBottom: '15px',
                            fontSize: '22px',
                            fontWeight: 'bold'
                        },
                        '& input': {
                            width: '100%',
                            textAlign: 'center'
                        },
                        '& a': {
                            paddingTop: '15px',
                            display: 'block'
                        }
                    })
                }>
                    <h1>{import.meta.env.VITE_NAME} - Connexion</h1>
                    <div>
                        <label>Nom d'utilisateur</label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Nom d'utilisateur"
                            onChange={(e) => {
                                setUsername(e.currentTarget.value)
                            }}
                        />
                    </div>
                    <div>
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            onChange={(e) => {
                                setPassword(e.currentTarget.value)
                            }}
                        />
                    </div>
                    <Link to='/register' className={css({
                        display: 'block'
                    })}>Vous n'avez pas encore de compte ?</Link>
                    <button type="submit">Me connecter</button>
                </form>
                <a>{error}</a>
            </main>
        </>
    )
}

export default Login