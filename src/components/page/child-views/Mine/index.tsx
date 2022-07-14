import MusicList from '@/common/musicList'
import {
  LIST_NULL_TEXT,
  PAGE_MINE_DESC_NULL_TEXT,
  PAGE_MINE_TAGS_NULL_TEXT,
} from '@/constant'
import { pushPlayingMusicList, switchCurrentMusic } from '@/store/music'
import { useAppDispatch } from '@/store'
import { MusicListItem } from '@/store/music/types'
import { formatCount, parseTime } from '@/utils'
import React, { memo } from 'react'
import useGetPlayList from './hooks/useGetPlayList'
import useChangeActiveItem from './hooks/useChangeActiveItem'

const Mine = memo(() => {
  const dispatch = useAppDispatch()
  const playList = useGetPlayList()
  const { setActiveItem, activeItem, computedTracks, showMore } =
    useChangeActiveItem()
  // 点击歌单详情列表的歌曲添加到playing中
  const pushIntoPlayingMusicList = (item: MusicListItem) => {
    dispatch(switchCurrentMusic(item))
    dispatch(pushPlayingMusicList(item))
    //TODO:push成功的dialog
  }

  return !playList?.length ? (
    <div h='full' w='full' flex='~' justify='center' items='center'>
      {LIST_NULL_TEXT}
    </div>
  ) : !activeItem ? (
    <div flex='~ wrap' items='start' w='full' overflow='auto'>
      {playList.map(item => (
        <div
          key={item.id}
          className='transition 2xl:(w-[16.6%]) xl:(w-[20%]) md:(w-[25%]) <md:(w-[33.3%])'
          onClick={() => setActiveItem(item)}
          p='10px'
          flex='~ col'
          justify='center'
          relative='~'
        >
          <div className='w-full pt-[100%] relative rounded-lg overflow-hidden bg-[rgba(0,0,0,.3)]'>
            <img
              w='full'
              absolute='~'
              top='0'
              left='0'
              shadow='md dark-100'
              cursor='pointer'
              src={item.coverImgUrl + '?param=200y200'}
            />
          </div>
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
  ) : (
    <div flex='~ col' h='full'>
      <div className='flex <md:(flex-col items-center)' w='full'>
        <div className='2xl:(w-[16.6%]) xl:(w-[20%]) md:(w-[25%]) <md:(w-[20%])'>
          <img
            w='full'
            rounded='lg'
            shadow='md dark-100'
            className='<md:(rounded-full)'
            src={activeItem.coverImgUrl + '?param=200y200'}
          />
        </div>
        <div className='flex-1 px-20px <md:(w-full)'>
          <div className='flex justify-between text-20px leading-[40px]'>
            <p text='gray'>{activeItem.name}</p>
            <button
              onClick={() => setActiveItem(null)}
              text='15px'
              className='hover:(text-white) '
            >
              返回
            </button>
          </div>
          <p>
            创建时间：
            {parseTime(activeItem.createTime ?? 0)}
          </p>
          <p>歌单作者：{activeItem.creator?.nickname}</p>
          <p>播放量：{formatCount(activeItem.playCount ?? 0, 2)}</p>
          <div className='flex items-center'>
            标签：
            {activeItem?.tags?.length
              ? activeItem?.tags?.map((item, index) => (
                  <p key={index} className='px-5px'>
                    {item}
                  </p>
                ))
              : PAGE_MINE_TAGS_NULL_TEXT}
          </div>
          <div className='line-clamp-3'>
            <div flex='~' justify='between'>
              介绍:
            </div>
            <div>
              {activeItem.description
                ?.split('\n')
                .map((item, index) => <p key={index}>{item}</p>) ??
                PAGE_MINE_DESC_NULL_TEXT}
            </div>
          </div>
        </div>
      </div>
      <div flex='1' overflow='hidden'>
        <MusicList
          source={computedTracks}
          rowClick={pushIntoPlayingMusicList}
          callback={() => showMore()}
        />
      </div>
    </div>
  )
})

export default Mine
