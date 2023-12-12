import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInAccount } from '../Config/api';

const SignInForm = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    try {
      setLoading(true)
      const user = await signInAccount({ email, password })
      if (!user) setError(true)
      navigate('/Dashboard')

    } catch (error) {
      console.log(error)
      return error
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-red-200 to-orange-400 dark:from-zinc-950 dark:to-zinc-500 ">

      <div className='pt-6 pl-9 '>
        <img src="/src/assets/We-logo.svg" width={90} height={80} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center px-1 py-8 md:py-16 ">

        <div className="w-full md:w-96 bg-white rounded-lg shadow dark:border md:mt-0 md:p-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-orange-500 md:text-2xl dark:text-white">
              Sign in to your account
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
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-orange-500 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-orange-50 border border-orange-300 text-orange-500 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-orange-500 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-orange-50 border border-orange-300 text-orange-500 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-orange-300 rounded bg-orange-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-orange-500 dark:text-orange-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button
                type="submit"
                className={`w-full text-white ${loading ? "bg-gray-700" : "bg-orange-500"} hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-orange-500 dark:text-orange-400">
                Don’t have an account yet?
                <Link to='/sign-up' className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInForm;
