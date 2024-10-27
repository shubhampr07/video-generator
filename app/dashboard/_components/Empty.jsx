import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Empty = () => {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dotted'>
        <h2>You don't have any short video created</h2>
        <Link href={'/dashboard/create-new'}><Button>Create New Short Video</Button></Link>
    </div>
  )
}

export default Empty