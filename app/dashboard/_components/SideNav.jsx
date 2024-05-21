import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import React from 'react'

const SideNav = () => {
    const menuList = [
        {
        id:1, 
        name:'My Forms',
        icon : LibraryBig,
        path : '/'
        },

        {
        id:2, 
        name:'Responses',
        icon : MessageSquare,
        path : '/'
        },

        {
        id:3, 
        name:'Analytics',
        icon : LineChart,
        path : '/'
        },

        {
        id:4, 
        name:'Upgrade',
        icon :Shield,
        path : '/'
        }

    ]
  return (
    <div className='h-screen shadow-md border'>

    <div className='p-5'>
    {menuList.map((menu,index)=> {
            return <h2 key={index} className='flex items-center gap-3 p-4 mb-2 hover:bg-primary hover:text-white rounded-lg cursor-pointer text-gray-500'>
                <menu.icon/>
                {menu.name}
                
            </h2>
        })}

    </div>
    </div>
  )
}

export default SideNav