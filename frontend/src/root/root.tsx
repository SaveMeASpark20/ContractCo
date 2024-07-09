
import { Outlet } from 'react-router-dom'
import '../App.css'
import Navbar from '../component/Navbar'

function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Root
