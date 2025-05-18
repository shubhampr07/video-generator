import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useContext } from 'react'

const Header = () => {

  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  return (
    <div className='p-4 px-6 flex items-center justify-between bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-20 transition-all duration-300'>
        <div className='flex gap-4 items-center'>
            <div className='relative group'>
              <div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 blur'></div>
              <div className='relative'>
                <Image width={50} height={50} src={'/logo.png'} className='rounded-full' />
              </div>
            </div>
            <h2 className='font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500'>CineAI</h2>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex gap-2 items-center bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-2 px-3 rounded-full shadow-sm'>
            <Image src={'/coin.png'} width={24} height={24} className='animate-pulse' />
            <h2 className='font-semibold'>{userDetail?.credits || 0}</h2>
          </div>
          <Button className='rounded-full shadow-md hover:shadow-lg transition-all duration-300 hidden md:flex'>Dashboard</Button>
          <div className='p-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-10 md:mr-0'>
            <UserButton />
          </div>
        </div>
    </div>
  )
}

export default Header