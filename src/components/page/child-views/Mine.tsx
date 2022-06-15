import { useAppSelector } from '@/store'
import { PlayingListItem } from '@/store/user/types'
import { formatCount } from '@/utils'
import React, { memo, useState } from 'react'
const Mine = memo(() => {
  const { playList } = useAppSelector(state => state.user)
  //TODO:做选中歌单之后做FLIP动画
  // 当前点击的歌单
  const [activeItem, setActiveItem] =
    useState<PlayingListItem | null>(null)
  return (
    <div flex='~ wrap' items='start'>
      {playList.map(item => (
        <div
          style={{
            display:
              !activeItem || item === activeItem ? 'flex' : 'none',
          }}
          key={item.id}
          className='transition 2xl:(w-[16.6%]) xl:(w-[20%]) md:(w-[25%]) <md:(w-[33.3%])'
          onClick={() => {
            setActiveItem(item)
          }}
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
      <button onClick={() => setActiveItem(null)}>clear test</button>
    </div>
  )
})

export default Mine
