import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthLayout, SignInForm } from './Components/paths'
import SignUpForm from './Pages/SignUpForm'
import DashBoard from './Pages/DashBoard'
import UserLayout from './Components/UserLayout'
import Chat from './Pages/Chat'
import Planner from './Pages/Planner'
import Folder from './Pages/Folder'
import UserProfile from './Pages/UserProfile'
import ClearInfoAuth from './Components/ClearInfoAuth'
function App() {

  return (
 <div className='w-full h-full'>
       <Routes>
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route  element={<UserLayout />}>
          <Route index element={<DashBoard />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/planner' element={<Planner />} />
          <Route path='/folder' element={<Folder />} />
          
        </Route>
          <Route  element={<ClearInfoAuth/>}>
              <Route path='/user/:username' element={<UserProfile/>}/>
          </Route>
      </Routes>
  
 </div>
  )
}

export default App
