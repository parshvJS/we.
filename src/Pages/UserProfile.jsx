import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserProfile } from '../Config/api'

const UserProfile = () => {
    const {id}=useParams()
    useEffect(async ()=>{
        const user=await getUserProfile(id)
    },[])
  return (
<div className="max-w-[819px] mx-auto sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[819px] h-[416px] bg-red-200 rounded-[15px]">

<div class="w-[170.19px] h-[164.11px] bg-rose-600 rounded-full sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px]"></div>

</div>
  )
}

export default UserProfile