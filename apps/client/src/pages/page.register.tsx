import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { accountClient } from '../utils/util.clients'
import { refresh } from '../utils/util.functions'
import { css } from '../styled-system/css'

const Register = () => {
    const [error, setError] = useState<string | null>(null)
    const [userName, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [emailConfirmation, setEmailConfirmation] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const res = await accountClient.createStep1({
            body: {
                userName: userName,
                password: password,
                passwordConfirmation: passwordConfirmation,
                email: email,
                emailConfirmation: emailConfirmation
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
                <title>{import.meta.env.VITE_NAME} - Inscription</title>
                <form onSubmit={handleSubmit} action="#" method="post" className={
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
                    <h1>{import.meta.env.VITE_NAME} - Inscription</h1>
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
                    <div>
                        <label>Confirmation du mot de passe</label>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Confirmation"
                            onChange={(e) => {
                                setPasswordConfirmation(e.currentTarget.value)
                            }}
                        />
                    </div>
                    <div>
                        <label>Adresse email</label>
                        <input
                            type="mail"
                            name="email"
                            placeholder="Adresse email"
                            onChange={(e) => {
                                setEmail(e.currentTarget.value)
                            }}
                        />
                    </div>
                    <div>
                        <label>Confirmation de l'adresse email</label>
                        <input
                            type="mail"
                            name="email"
                            placeholder="Adresse email"
                            onChange={(e) => {
                                setEmailConfirmation(e.currentTarget.value)
                            }}
                        />
                    </div>
                    <Link to='/login'>Vous avez déjà un compte ?</Link>
                    <button type="submit">M'inscrire</button>
                </form>
                <a>{error}</a>
            </main>
        </>
    )
}

export default Register