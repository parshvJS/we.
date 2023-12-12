import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SignUpForm from '../../Pages/SignUpForm'
import { useUserContext } from '../../context/Context'

const AuthLayout = () => {
    const navigate=useNavigate()
    const isAuth=true

    if(isAuth){
   <SignUpForm/>
   }
 else{
   <Outlet/>
 }
//  else{
//     navigate('/dashboard')
//  }
}

export default AuthLayout