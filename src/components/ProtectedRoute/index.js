import { Navigate, Outlet } from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = () => {
  const token = Cookie.get('jwt_token')
  if (!token) {
    return <Navigate to="/login" />
  }

  return <Outlet />  // This will render the nested routes
}

export default ProtectedRoute
