import React from 'react'
import { useAppContext } from '../context/appContext'

const Chat = () => {
  const {setTopBarTitle}=useAppContext()
  setTopBarTitle('Chat')
  return (
    <div>Chat</div>
  )
}

export default Chat