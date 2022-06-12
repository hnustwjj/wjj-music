import { useAppSelector } from '@/store'
import { formatCount } from '@/utils'
import React, { memo } from 'react'
const Mine = memo(() => {
  const { playList } = useAppSelector(state => state.user)

  return (
    <div flex='~ wrap' items='start'>
      {playList.map(item => (
        <div
          key={item.id}
          className='2xl:(w-[16.6%]) xl:(w-[20%]) md:(w-[25%]) <md:(w-[33.3%])'
          p='10px'
          flex='~ col'
          justify='center'
          relative='~'
        >
          <img
            w='full'
            rounded='lg'
            shadow='md dark-100'
            cursor='pointer'
            src={item.coverImgUrl + '?param=200y200'}
          />
          <div
            className='bg-[rgba(0,0,0,.3)]'
            absolute='~'
            top='15px'
            right='15px'
            text='white 12px'
            leading='20px'
            p='x-8px'
            rounded='full'
          >
            {formatCount(item.playCount ?? 0, 0)}
          </div>
          <div
            className='overflow-two-line <md:(text-12px leading-16px) md:(text-14px leading-21px)'
            text='white'
          >
            {item.description ?? '咋那么懒，连个描述都没~'}
          </div>
        </div>
      ))}
    </div>
  )
})

export default Mine
