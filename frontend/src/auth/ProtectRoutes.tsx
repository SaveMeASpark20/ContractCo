import  { PropsWithChildren, useEffect } from 'react'
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';


type Props = PropsWithChildren;

const ProtectRoutes = ({children}: Props) => {
  const navigate = useNavigate()
  // const {user} = useAuth()

  // useEffect(() => {
  //   if (user === null) {
  //     console.log(user);
  //     return navigate('/login', { replace: true });
  //   }
  // }, [user])

  return children
}

export default ProtectRoutes
