import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserProfile } from '../Config/api'

const UserProfile = () => {
    const {id}=useParams()
    useEffect(async ()=>{
        const user=await getUserProfile(id)
    },[])
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile