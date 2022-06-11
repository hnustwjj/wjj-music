import { useAppSelector } from '@/store'
import { formatCount } from '@/utils'
import React, { memo } from 'react'

const Mine = memo(() => {
  const { playList } = useAppSelector(state => state.user)

  return (
    <div flex='~ wrap' items='start'>
      {playList.map(item => (
        <div
          className='2xl:(w-[16.6%]) xl:(w-[20%]) md:(w-[25%]) <md:(w-[33.3%])'
          p='10px'
          flex='~'
          justify='center'
          relative='~'
        >
          <img
            w='full'
            rounded='md'
            shadow='md dark-100'
            cursor='pointer'
            src={item.coverImgUrl + '?param=200y200'}
            key={item.id}
            alt=''
          />
          <div
            className='bg-[rgba(0,0,0,.5)]'
            absolute='~'
            top='18px'
            right='18px'
            text='white 12px'
            leading='20px'
            p='x-8px'
            rounded='full'
          >
            {formatCount(item.playCount ?? 0, 0)}
          </div>
          <span className='overflow-two-line'>
            {item.description}
          </span>
        </div>
      ))}
    </div>
  )
})

export default Mine
