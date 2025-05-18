import { Thumbnail } from '@remotion/player'
import React, { useState } from 'react'
import RemotionVideo from './RemotionVideo'
import PlayerDialog from './PlayerDialog'
import { Play, Calendar } from 'lucide-react'

function VideoList({videoList}) {

    const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
    const [videoId, setVideoId] = useState();
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {videoList?.map((video, index) => (
            <div key={index} className='group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300' 
                 onClick={() => {setOpenPlayerDialog(Date.now()); setVideoId(video?.id)}}>
                <div className='relative cursor-pointer overflow-hidden rounded-t-xl'>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <div className='bg-white/20 backdrop-blur-sm p-3 rounded-full'>
                            <Play size={24} className='text-white' />
                        </div>
                    </div>
                    <div className='transform group-hover:scale-105 transition-transform duration-500'>
                        <Thumbnail 
                            component={RemotionVideo}
                            compositionWidth={400}
                            compositionHeight={780}
                            frameToDisplay={30}
                            durationInFrames={120}
                            fps={30}
                            style={{
                                width: '100%',
                                height: '220px',
                                objectFit: 'cover',
                                borderTopLeftRadius: '0.75rem',
                                borderTopRightRadius: '0.75rem'
                            }}
                            inputProps={{
                                ...video,
                                setDurationInFrame:(v) => console.log(v)
                            }} />
                    </div>
                </div>
                <div className='p-3'>
                    <h3 className='font-medium text-gray-800 dark:text-gray-200 truncate'>
                        {video?.script && video.script[0]?.ContentText 
                            ? video.script[0].ContentText.substring(0, 30) + '...' 
                            : `Video #${index + 1}`}
                    </h3>
                    <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1'>
                        <Calendar size={12} className='mr-1' />
                        <span>Created on {new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        ))}

        <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
    </div>
  )
}

export default VideoList