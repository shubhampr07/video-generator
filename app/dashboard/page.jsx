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
        <div className='flex justify-between items-center'> 
            <h2 className='font-bold text-xl text-secondary-foreground'>Dashboard</h2>
            <Link href={'/dashboard/create-new'}><Button><PlusCircleIcon /> Create New</Button></Link>
        </div>

        {videoList?.length == 0 && <div>
            <Empty /> 
            </div>}

            <VideoList videoList={videoList} />
    </div>
  )
}

export default DashboardPage