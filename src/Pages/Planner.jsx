import React from 'react'
import { useAppContext } from '../context/appContext'

const Planner = () => {
  const { setTopBarTitle } = useAppContext()
  setTopBarTitle('Schedules')
  return (
    <div>Planner</div>
  )
}

export default Planner