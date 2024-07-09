import {ReactNode, createContext, useContext, useEffect, useState} from 'react'
import { AuthContextType, LogInValues, User } from '../types';

type Props = {
    children : ReactNode
}

const defaultAuthContext: AuthContextType = {
  user: undefined,
  login: async () => false,
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider = ({children} : Props) => {
	const [user, setUser] = useState<User | null| undefined >(undefined)

	useEffect(() =>{
		const checkAuth = async ()=>{
				try {
				const response = await fetch('http://localhost:3000/auth/userauthorization', {
					credentials : 'include'
				});
				
				if(response.ok) {
					const userData = await response.json();
					const name = `${userData.firstname} ${userData.lastname}`;
					setUser({name, role: userData.userType});
				}
        else{
          setUser(null);
        }
        
			} catch (error: any) {
        setUser(null)
				console.log(error.message)	
			}
		}
		checkAuth();
    
	},[])

	const login = async (data : LogInValues) : Promise<boolean>=> {
		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method : "POST",
				headers : {
					"Content-Type": "application/json"
				},
				body : JSON.stringify(data),
				credentials : "include"
			})
			if(response.ok) {
				return true;
			}
			return false

		} catch (error : any) {
			console.error('Login error:', error.message);
			return false 
		}
	}

	const logout = async () => {
		try {
			const response = await fetch('http://localhost:3000/auth/logout', {
				credentials : 'include'
			})
	
			if(response.ok){
				setUser(undefined);
				window.location.reload();
        console.log("user" + user)
			}
		} catch (error : any) {
			console.log(error.message)
		}
	}

  return (
    <AuthContext.Provider value={{user, login, logout}} >
		{children}
	</AuthContext.Provider>
  )
}

export default AuthProvider;


export const useAuth = () => {
  return useContext(AuthContext);
};