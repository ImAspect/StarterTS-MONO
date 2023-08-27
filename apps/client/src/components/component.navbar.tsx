import { Link } from 'react-router-dom'
import { accountClient } from '../utils/util.clients'
import { accountStore } from '../stores/store.account'
import { css } from '../styled-system/css'

const Navbar = () => {

    const { account } = accountStore()

    const refresh = async () => {
        window.location.reload()
    }

    const handleSubmit = async () => {
        await accountClient.logout()
        refresh()
    }

    const switchLogged = (logged: boolean) => {
        switch (logged) {
            case true:
                return <>
                    <li>
                        <Link to={'/profil'}>Profil</Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Déconnexion
                        </button>
                    </li>
                </>
            case false:
                return <>
                    <li>
                        <Link to={'/login'}>Connexion</Link>
                    </li>
                    <li>
                        <Link to={'/register'}>Inscription</Link>
                    </li>
                </>
        }
    }

    return (
        <>
            <header className={
                css({
                    height: 'auto',
                    width: '100%'
                })
            }>
                <div className={
                    css({
                        display: 'flex',
                        justifyContent: 'space-between',
                        '& ul:not(last-child)': {
                            marginRight: '20px'
                        },
                        '& li': {
                            display: 'inline-block',
                            '& :not(last-child)': {
                                marginRight: '5px'
                            }
                        }
                    })
                }>
                    <ul>
                        <li>
                            <Link to={'/home'}>Accueil</Link>
                        </li>
                    </ul>
                    <ul>
                        {switchLogged(account.isLogged)}
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Navbar