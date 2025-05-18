import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FileVideo, PlusCircle } from 'lucide-react'

const Empty = () => {
  return (
    <div className='p-8 py-16 flex items-center flex-col mt-8 rounded-xl border border-dashed bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md'>
        <div className='w-20 h-20 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center mb-6'>
          <FileVideo size={36} className='text-purple-600 dark:text-purple-400' />
        </div>
        <h2 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3'>No videos created yet</h2>
        <p className='text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md'>Create your first AI-generated short video with just a few clicks</p>
        <Link href={'/dashboard/create-new'}>
          <Button className='rounded-full px-6 py-6 h-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-xl'>
            <PlusCircle className='mr-2' size={18} />
            Create New Short Video
          </Button>
        </Link>
    </div>
  )
}

export default Empty