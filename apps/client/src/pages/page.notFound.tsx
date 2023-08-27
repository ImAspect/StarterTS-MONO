import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const NotFound = () => {
  const [redirectHome, setRedirectHome] = useState<boolean>(false)
  const [count, setCount] = useState<number>(5)

  useEffect(() => {
    const count = setInterval(function () {
      setCount((prevCount) => prevCount - 1)
    }, 1000)
    setTimeout(() => {
      setRedirectHome(true)
    }, 5000)
    return () => clearInterval(count)
  })

  return (
    <>
      {redirectHome && <Navigate to="/home" />}
      <title>{import.meta.env.VITE_APP_TITLE} - 404</title>
      <h1>Error: 404</h1>
      <h4>
        You will be redirected in{' '}
        {count <= 1 ? count + ' second' : count + ' seconds'} ...
      </h4>
    </>
  )
}

export default NotFound
