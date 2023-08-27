import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import uidContext from './contexts/context.uid'
import Navbar from './components/component.navbar'
import Home from './pages/page.home'
import Register from './pages/page.register'
import Login from './pages/page.login'
import NotFound from './pages/page.notFound'
import { ProtectedRoute } from './components/component.protected'
import './index.css'
import { css } from './styled-system/css'

const App: React.FC = () => {
  const [uid, setUid] = useState<string | null>(null)
  useAuth().then((res) => setUid(res.body.data.id))

  return (
    <>
      <uidContext.Provider value={uid}>
        <Navbar />
        <div className={
          css({
            textAlign: 'center',
            paddingTop: '50px'
          })
        }>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/home" element={<Home />} />
            <Route path="/register" element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </uidContext.Provider>
    </>
  )
}

export default App
