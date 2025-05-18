"use client"
import { Button } from '@/components/ui/button'
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNav = () => {

    const MenuOptions=[
        {
            id:1,
            name: 'Dashboard',
            path: '/dashboard',
            icon: PanelsTopLeft
        },
        {
            id:1,
            name: 'Create New',
            path: '/dashboard/create-new',
            icon: FileVideo
        },
        {
            id:3,
            name: 'Upgrade',
            path: '/upgrade',
            icon: ShieldPlus
        },
        {
            id:4,
            name: 'Account',
            path: '/account',
            icon: CircleUser
        }
    ]

    const pathname = usePathname();

  return (
    <div className='w-64 h-screen p-6 flex flex-col'>
        <div className='mb-8 mt-2 flex items-center justify-center'>
            <h2 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500'>Reel Generator</h2>
        </div>
        <div className='flex flex-col space-y-2'>
        {MenuOptions.map((item, index) => (
            <Link href={item.path} key={index}>
                <div className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 ${pathname==item.path ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <div className={`${pathname==item.path ? 'text-white' : 'text-teal-600 dark:text-teal-400'}`}>
                    <item.icon size={20} />
                </div>
                <h2 className='font-medium'>{item.name}</h2>
                </div>
            </Link>
        ))}
        </div>
        <div className='mt-auto mb-6 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 shadow-sm'>
            <h3 className='text-sm font-medium text-teal-800 dark:text-teal-300'>Need Help?</h3>
            <p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>Check our documentation or contact support for assistance.</p>
            <Button className='mt-3 w-full text-xs h-8 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'>View Documentation</Button>
        </div>
    </div>
  )
}

export default SideNav