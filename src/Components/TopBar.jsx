import React, { useState } from 'react';
import AppContext, { useAppContext } from '../context/appContext';
import { useUserContext } from '../context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser } from '../Config/api';

const TopBar = ({ showTitle }) => {
    const { topBarTitle } = useAppContext();
    const { user, setUser } = useUserContext();

    const [userMenu, setUserMenu] = useState(false);

    const navigate = useNavigate();

    async function handleLogOut() {
        try {
            const logout = await signOutUser();

            navigate('sign-in');
            setUser({});
            localStorage.removeItem('user');
            if (!logout) throw Error;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const userMenuStyles = {
        position: 'absolute',
        top: '100%',
        right: 0,
        width: '284px',
        maxHeight: '424px',
        backgroundColor: '#4A4A4A',
        borderRadius: '12px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        display: userMenu ? 'block' : 'none',
        padding: '16px',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        opacity: userMenu ? 1 : 0,
        transform: userMenu ? 'scale(1)' : 'scale(0.95)',
    };

    const popUpNav = [
        {
            label: 'Your Profile',
            image: '/src/assets/icons/user-dummy.png',
            route: `/user/${user.id}`,
        },
    ];

    TopBar.defaultProps = {
        showTitle: true,
    };
    return (
        <div style={{ position: 'relative' }}>
            <div className="flex justify-between mt-5 mx-8">
                <img src="/src/assets/We-logo.svg" width={60} height={60} alt="" />
                <div>
                    {
                        showTitle ? <p className="text-white text-3xl font-normal">{topBarTitle}</p> : ""
                    }
                </div>
                <div className="flex gap-5" style={{ position: 'relative' }}>
                    <img width={20} height={20} src="/src/assets/icons/notification-icon.svg" alt="" />
                    <div className="user-menu-container" style={{ position: 'relative' }}>
                        <button onClick={() => setUserMenu(!userMenu)}>
                            <img
                                width={40}
                                height={40}
                                src={`${user.profileUrl}`}
                                className="rounded-full border-[2.5px] border-black bg-white"
                                alt=""
                            />
                        </button>
                        <div style={userMenuStyles}>
                            <div className="flex gap-4 justify-between">
                                <Link to={`/user/${user.id}`} className="flex gap-4 justify-center">
                                    <img
                                        width={40}
                                        height={40}
                                        src={`${user.profileUrl}`}
                                        className="rounded-full border-[2.5px] border-black w-[50px]"
                                        alt=""
                                    />


                                    <div className="flex flex-col">
                                        <p className="username text-white font-bold text-sm">{user.name}</p>
                                        <p className="username text-neutral-400 font-thin">@{user.username}</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => setUserMenu(false)}
                                    className=" flex justify-center items-center w-6 h-6 rounded-full hover:bg-[#5E5E5E] m-3 "
                                >
                                    <img width={15} height={15} src="/src/assets/icons/close-icon.png" alt="" />
                                </button>
                            </div>
                            {/* horizontal line  */}
                            <div className="px-4 border border-stone-500 my-2"></div>
                            <div>
                                <ul className="px-3 flex justify-center items-center">
                                    {popUpNav.map((nav) => {
                                        return (
                                            <Link to={nav.route} key={nav.label}>
                                                <li className="flex gap-4 hover:bg-[#5E5E5E] w-[250px] h-10 justify-start px-3 rounded-md items-center">
                                                    <img className="w-5 h-5 text-center" src={nav.image} alt={nav.label} />
                                                    <p className="text-white text-xs font-semibold ">{nav.label}</p>
                                                </li>
                                            </Link>
                                        );
                                    })}
                                </ul>

                                <div className="px-4 border border-stone-500 my-2"></div>

                                <button
                                    onClick={handleLogOut}
                                    className="flex gap-4 hover:bg-[#5E5E5E] w-[250px] h-10 justify-start px-3 rounded-md items-center"
                                >
                                    <img className="w-5 h-5 text-center" src="/src/assets/icons/logout.png" alt="log Out Button" />
                                    <p className="text-white text-xs font-semibold ">Log Out</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default TopBar;
