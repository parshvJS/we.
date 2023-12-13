import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserProfile } from '../Config/api';
import '@popperjs/core';
import { useUserContext } from '../context/Context';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user:userContext}=useUserContext()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile(username);
        setUser(userProfile);
        console.log(userContext)
        console.log(user,'username',username)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className='w-full h-full my-10 flex justify-center'>
      <Link to={`/`} className=''>
        <img src="/src/assets/icons/back-icon.png" className='w-8 h-8 mr-2 hover:bg-[#FFC4C4] rounded-full transition p-[3px]' alt="" />
      </Link>
      <div className="white-box transition">
        {loading ? (
          <div className="max-w-[600px] mx-auto sm:w-[400px] md:w-[390px] lg:w-[500px] xl:w-[600px] h-[400px] bg-red-200 rounded-[10px] flex justify-center ">
            <div className='flex justify-center flex-col items-center '>
              <div className='flex items-center justify-center'>

                <div role="status">
                  <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[600px] mx-auto sm:w-[400px] md:w-[390px] lg:w-[500px] xl:w-[600px] h-[400px] bg-red-200 rounded-[10px] flex justify-center ">
            {user && (
              <div className='flex justify-start flex-col items-center '>
                <div className='flex items-center justify-center'>
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-rose-600 rounded-full mt-[-10px] md:mt-[-40px]"
                    src={user.profileUrl}
                    alt="User Profile"
                  />
                </div>
                <div className='flex gap-2 flex-col items-center'>
                  <div>
                    <p className='text-black font-semibold text-center text-[32px]'>{user.name}</p>
                    <p className='text-zinc-700 text-[32px] font-extralight'>@{user.username}</p>
                  </div>
                  {!user.bio || user.bio.length === 0 ? (
                    <p className='text-center text-[16px] text-black text-base font-normal '>No Bio Yet</p>
                  ) : (
                    <p className='text-center text-black text-[16px] text-base font-normal'>{user.bio}</p>
                  )}
                </div>
                {username ===userContext.id && (
                  <div className='absolute top-[120px] right-[390px]'>
                    <Link to={`/edit/${username}`}>
                      <img className='w-[35px] h-[35px] p-1 rounded-full m-3 hover:bg-[#fbfbfb] transition overflow-hidden' src="/src/assets/icons/edit-profile.png" alt="Edit Profile" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
