import React, { memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'

import { formatTime } from '@/utils'
import { changeCurrentMusic, changeLyric } from '@/store/music'
const Playing = memo(() => {
  const musicList = useAppSelector(state => state.music.musicList)
  const dispatch = useAppDispatch()

  const switchMusic = item => {
    dispatch(changeCurrentMusic(item))
    dispatch(changeLyric(item.id))
  }
  return (
    <>
      {musicList.length ? (
        <>
          <div
            flex='~'
            text='14px thin'
            border='b-1'
            className='border-[hsla(0,0%,100%,.1)]'
            leading='50px'>
            <span w='55px' />
            <span className='flex-[4]'>歌曲</span>
            <span className='flex-1'>歌手</span>
            <span w='60px'>时长</span>
          </div>
          <div flex='1' overflow='auto'>
            {musicList.map((item, index) => (
              <div
                flex='~'
                text='14px thin'
                leading='50px'
                border='b-1'
                cursor='pointer'
                className='border-[hsla(0,0%,100%,.1)] hover:bg-[rgba(0,0,0,.05)]'
                onClick={() => switchMusic(item)}>
                <span w='55px' text='center'>
                  {index + 1}
                </span>
                <span className='flex-[4]'>{item.name}</span>
                <span className='flex-1'>{item.ar[0].name}</span>
                <span w='60px'>{formatTime(item.dt)}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        '暂无歌曲'
      )}
    </>
  )
})

export default Playing
