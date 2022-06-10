import { useAppSelector } from '@/store'
import React, { memo } from 'react'

const Mine = memo(() => {
  const { playList } = useAppSelector(state => state.user)

  return (
    <div flex='~ wrap' items='start'>
      {playList.map(item => (
        <div
          className='2xl:(w-[16.6%]) xl:(w-[20%]) md:(w-[25%]) <md:(w-[33.3%])'
          p='x-10px b-20px'
          flex='~'
          justify='center'
        >
          <img
            className='w-full'
            src={item.coverImgUrl + '?param=200y200'}
            key={item.id}
            alt=''
          />
        </div>
      ))}
    </div>
  )
})

export default Mine
