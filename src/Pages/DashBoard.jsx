import React from 'react'
import { useAppContext } from '../context/appContext'

const DashBoard = () => {
  const {setTopBarTitle}=useAppContext()
  setTopBarTitle('Dashboard')
  return (
    <div>DashBoard</div>
  )
}

export default DashBoard