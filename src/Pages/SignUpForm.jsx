import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, signInAccount } from '../Config/api';
import { useUserContext } from '../context/Context';
const SignUpForm = () => {
  const { checkAuthUser } = useUserContext();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUser(username, name, email, password);
      const account = await checkAuthUser();
      if (account) {
        navigate('/')
      }
      else {
        setError(true)
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <section className="min-h-screen bg-gradient-to-b from-red-200 to-orange-400 dark:from-zinc-950 dark:to-zinc-500">
      <div className='pt-6 pl-9'>
        <img src="/src/assets/We-logo.svg" width={90} height={80} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center px-1 py-8 md:py-8">
        <div className="w-full md:w-96 bg-white rounded-lg shadow dark:border md:mt-0 md:p-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-orange-500 md:text-2xl dark:text-white">
              Sign up for a new account
            </h1>
            {
              error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Holy smokes!</strong><br />
                <span className="block sm:inline">Something bad happened. </span>
                <button onClick={() => setError(false)} className="transition absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </button>
              </div>
            }
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-orange-500 dark:text-white">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-orange-50 border border-orange-300 text-orange-500 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required=""
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-orange-500 dark:text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-orange-50 border border-orange-300 text-orange-500 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-orange-500 dark:text-white">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-orange-50 border border-orange-300 text-orange-500 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john_doe123"
                  required=""
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-orange-500 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-orange-50 border border-orange-300 text-orange-500 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <button
                type="submit"
                className={`${loading ? 'bg-gray-500' : ''} w-full text-white bg-orange-500  hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                Sign up
              </button>
              <p className="text-sm font-light text-orange-500 dark:text-orange-400">
                Already have an account? <Link to="/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
