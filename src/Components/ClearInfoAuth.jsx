import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'

const ClearAuth = () => {

  return (
    <>

<div className=' bg-gradient-to-b from-red-500 via-orange-500 to-orange-400 w-full h-full'>

<div className='flex flex-col'>
  <TopBar showTitle={false}/>
  <div className='flex flex-1'>
    <Outlet />
  </div>
</div>
</div>
    </>
  )
}

export default ClearAuth