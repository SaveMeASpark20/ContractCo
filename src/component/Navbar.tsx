import {  useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"


const Navbar = () => {
  const { user, logout } = useAuth();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdownVisibility = (event : React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault();
    setIsDropdownVisible(!isDropdownVisible);
  };


  const navLinks = {
    public :[ 
      {name : 'Log In', path : '/login'},
      {name : 'Sign Up', path : '/signup'},
    ],
  
    client : [
      {name : 'Dashboard', path : '/dashboard'},
      {name : 'Save Contructors', path : '/savecontructor'},
    ],
  
    contructor : [
      {name : 'Dashboard', path : '/dashboard'},
      {name : 'Save Contructors', path : '/savecontructor'},
      {name : 'Services', path : '/services'},
    ]
  }
  
  const userMenu = [
    {name : 'Profile', path: '/profile'},
    {name : 'Setting', path: '/settings'},
    {name : 'Logout',  action : 'logout'},
  ]
  return (
    <>
    <nav className="grid grid-cols-2 justify-items-end items-center  border border-b-[#2a2a2a] p-4">
      <h1 className="text-xl md:text:lg">ContractCo.</h1>
      <ul className="flex justify-center items-center gap-3">
        <>
          {
            user === null && (
            navLinks.public.map((link, index)=> (
              <Link to={link.path} key={index}>
                <li  className="bg-[#25258a] text-[#e3e3e3] px-4 py-1 rounded-full border border-transparent hover:bg-[#e3e3e3] hover:text-[#25258a] hover:border-[#25258a]">
                    {link.name}
                </li>    
              </Link>
            )))
          }
          {user && (
            
            // Render links based on user's role
            navLinks[user.role as keyof typeof navLinks].map((link , index ) => (
              <Link to={link.path}  key={index}>
                <li className="bg-[#25258a] text-[#e3e3e3] px-4 py-1 rounded-full border border-transparent hover:bg-[#e3e3e3] hover:text-[#25258a] hover:border-[#25258a]"> 
                    {link.name}
                </li>
              </Link>
            )))
          }
          
        {user && (
          <div className="flex justify-center items-center gap-2 relative toggle-parent">
            <button  className="flex justify-center items-center gap-2" onClick={toggleDropdownVisibility}>{user.name} {userMenuLogo}</button>
            <ul className="absolute -top-[-20px] -right-0 bg-[#25258a] text-[#e3e3e3] rounded-lg toggle-child">
              {isDropdownVisible && userMenu.map((user, index)=> (
                  user.action && user.action == "logout" ?
                (
                  <button onClick={logout} key={index}>{user.name}</button>
                ) :
                (
                user.path &&
                  <Link to={user.path} key={index} className="border-b-2 border-[#e3e3e3]">
                    <li>{user.name}</li>
                  </Link>
                )
              ))}
            </ul>
          </div>
        )}
      </>
      </ul>
    </nav>
    </>
  )
}

export default Navbar           

const userMenuLogo =
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
  </svg>;



