import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideNavBar = () => {

    const navLink = [
        {
            icon: 'src/assets/icons/home-icon.png',
            iconHover: 'src/assets/icons/home-hover-icon.png',
            route: '/',
            label: 'home'
        },
        {
            icon: 'src/assets/icons/chat.png',
            iconHover: 'src/assets/icons/chat-hover.png',
            route: '/chat',
            label: 'chat'
        },
        {
            icon: 'src/assets/icons/planner.png',
            iconHover: 'src/assets/icons/planner-hover.png',
            route: '/planner',
            label: 'planner'
        },
        {
            icon: 'src/assets/icons/folder.png',
            iconHover: 'src/assets/icons/Folder-Hover.png',
            route: '/folder',
            label: 'folder'
        },
    ]
    const { pathname } = useLocation()
    return (
        <div className='flex flex-col flex-1 max-w-[2.5%]  ml-5 '>
            <ul className='transition-all gap-10'>
                {
                    navLink.map((icon) => {
                        const active = pathname === icon.route
                        return (
                            <li key={icon.label} className='flex'>
                               <Link to={icon.route}>
                               <img src={`${active ? icon.iconHover : icon.icon}`} className={`${active ? 'bg-black rounded-full ' : ''} w-9 h-9 p-[3px] mt-14`} alt="" />
                               </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SideNavBar