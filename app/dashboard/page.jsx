"use client"
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import Empty from './_components/Empty'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs/db'
import { VideoData } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import VideoList from './_components/VideoList'
import { UserDetailContext } from '../_context/UserDetailContext'


const DashboardPage = () => {

    const [videoList, setVideoList] = useState([]);
    // const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const {user} = useUser();

    useEffect(() => {
      user && GetVideoList();
    }, [user])

    const GetVideoList = async () => {
      const result = await db.select().from(VideoData)
      .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));
      setVideoList(result);
      console.log("videos from specific id", result);
    }
  return (
    <div className='mt-3'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white/80 dark:bg-gray-800/50 p-5 rounded-xl shadow-sm'> 
            <div>
              <h2 className='font-bold text-2xl text-gray-800 dark:text-gray-200'>Your Dashboard</h2>
              <p className='text-gray-500 dark:text-gray-400 mt-1'>Manage and create your AI-generated videos</p>
            </div>
            <Link href={'/dashboard/create-new'}>
              <Button className='bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
                <PlusCircleIcon className='mr-2' size={18} /> Create New
              </Button>
            </Link>
        </div>

        {videoList?.length == 0 ? (
          <Empty />
        ) : (
          <div className='bg-white/80 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm'>
            <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4'>Your Videos</h3>
            <VideoList videoList={videoList} />
          </div>
        )}
    </div>
  )
}

export default DashboardPage