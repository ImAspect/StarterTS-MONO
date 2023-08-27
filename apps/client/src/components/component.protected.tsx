import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import uidContext from '../contexts/context.uid'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const uid = useContext(uidContext)
    const location = useLocation()

    if (!uid || uid === null) { // PAS CONNECTÉ
        if (location.pathname === "/login") return children
        if (location.pathname === "/register") return children
        return <Navigate to="/login" replace />
    } else { // CONNECTÉ
        if (location.pathname === "/profil") return children
        if (location.pathname === "/logout") return children
        return <Navigate to="/home" replace />
    }
}

export { ProtectedRoute }