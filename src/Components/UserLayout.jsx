import React from 'react'
import { useUserContext } from '../context/Context'
import { Outlet, useNavigate } from 'react-router-dom'
import SideNavBar from './SideNavBar'
import TopBar from './TopBar'

const UserLayout = () => {

  const { isAuth } = useUserContext()
  const navigate = useNavigate()
  if (!isAuth) {
    navigate('/sign-in')
  }
  else {
    return (
      
      <div className=' bg-gradient-to-b from-red-500 via-orange-500 to-orange-400 w-full h-full'>

        <div className='flex flex-col'>
          <TopBar />
          <div className='flex flex-1'>
            <SideNavBar />
            <Outlet />
          </div>
        </div>
      </div>
    )
  }
}

export default UserLayout;