// Import the necessary dependencies
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../Config/api';

// Define the initial user state
const INITIAL_USER = {
  username: '',
  name: '',
  email: '',
  profileUrl: '/src/assets/profile-placeholder.svg',
  bio: '',
  id: ''
};

// Define the initial auth state
const INITIAL_AUTH = {
  user: INITIAL_USER,
  setUser: () => { },
  isAuth: false,
  setIsAuth: () => { },
  checkAuthUser: async () => false,
};

// Create the auth context
const authContext = createContext(INITIAL_AUTH);

// Create the context provider
const Context = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated
  async function checkAuthUser() {
    try {
      const user = await getCurrentUser()

      if (user) {
        const refinedUserData = {
          username: user.username || '',
          name: user.name || '',
          email: user.email || '',
          profileUrl: user.profileUrl || '/src/assets/profile-placeholder.svg',
          bio: user.bio || '',
          id: user.$id
        }
        setUser(refinedUserData)
        localStorage.setItem('user', JSON.stringify(refinedUserData))
        setIsAuth(true)
        return true;
      }
    } catch (error) {
      console.error(error)
      return false;
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user == null ||
      user == undefined ||
      user === '[]'
    ) {
      localStorage.removeItem('user')
      setIsAuth(false)
      navigate('sign-up')
    }
    checkAuthUser()
  }, [])

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    checkAuthUser
  }
  // Provide the context value to the children components
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default Context;
export const useUserContext = () => useContext(authContext);
