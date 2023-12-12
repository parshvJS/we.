import React from 'react'
import { useAppContext } from '../context/appContext'

const Folder = () => {
  const {setTopBarTitle}=useAppContext()
  setTopBarTitle('File & Folders')
  return (
    <div>Folder</div>
  )
}

export default Folder