
// $collectionId// :
// "656481892b0a5f88cd7c"
// $createdAt// :
// "2023-12-12T13:26:31.686+00:00"
// $databaseId// :
// "6564810740e6e049faaa"
// $id// :
// "65785f86710560f7b608"
// $permissions// :
// (3) ['read("user:656f47f1e30c919627fd")', 'update("user:656f47f1e30c919627fd")', 'delete("user:656f47f1e30c919627fd")']
// $updatedAt// :
// "2023-12-12T13:26:31.686+00:00"
// accountId// :
// "65785f86710560f7b608"
// bio// :
// null
// email// :
// "parshv@gmail.com"
// imageId// :
// "unique()"
// name// :
// "parshvsheth"
// profileUrl// :
// "https://cloud.appwrite.io/v1/avatars/initials?name=parshvsheth&width=100&height=100&project=656480a69fceeb7086ae"
// username// :
// "parshv114"
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserProfile } from '../Config/api';
import '@popperjs/core';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile(username);
        setUser(userProfile);
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
      <div className="white-box">
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

            {
              username === user.$id && <div className='absolute top-[120px] right-[390px]'>
                <Link to={`/edit/${username}`}>
                  <img className='w-[35px] h-[35px] p-1 rounded-full   m-3 hover:bg-[#fbfbfb] transition overflow-hidden' src="/src/assets/icons/edit-profile.png" alt="Edit Profile" />

                </Link>
              </div>
            }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
