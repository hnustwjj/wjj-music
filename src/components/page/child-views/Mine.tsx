import MusicList from '@/common/musicList'
import {
  LIST_NULL_TEXT,
  PAGE_MINE_DESC_NULL_TEXT,
  PAGE_MINE_TAGS_NULL_TEXT,
} from '@/constant'
import { pushPlayingMusicList, switchCurrentMusic } from '@/store/music'
import { getPlayListDetail } from '@/service/music'
import { useAppDispatch, useAppSelector } from '@/store'
import { MusicListItem } from '@/store/music/types'
import { PlayingListItem } from '@/store/user/types'
import { formatCount, parseTime } from '@/utils'
import React, { memo, useEffect, useState } from 'react'
import useSWR from 'swr'
import { getPlayList } from '@/service/user'
//TODO:使用Suspense API来加载图片(暂时没研究明白)
const Mine = memo(() => {
  const dispatch = useAppDispatch()
  // 歌单数据
  const { uid } = useAppSelector(state => state.user)
  // Suspense优化？？？
  // 最终决定不放在store中了
  const {
    data: { playlist },
  } = useSWR<any>(
    uid + '',
    uid =>
      getPlayList(Number(uid)).then(
        res => new Promise(resolve => setTimeout(() => resolve(res), 500))
      ),
    {
      suspense: true,
    }
  )
  // 当前点击的歌单
  const [activeItem, setActiveItem] = useState<PlayingListItem | null>(null)
  // 歌单详情
  const [detail, setDetail] = useState<MusicListItem[]>([] as MusicListItem[])
  // 点击歌单详情列表的歌曲添加到playing中
  const pushIntoPlayingMusicList = (item: MusicListItem) => {
    dispatch(switchCurrentMusic(item))
    dispatch(pushPlayingMusicList(item))
    //TODO:push成功的dialog
  }
  //TODO:滚动到最后请求下一页
  useEffect(() => {
    // 因为只有这里用到了歌单detail，所以就不放在store里了
    activeItem?.id &&
      getPlayListDetail(activeItem.id).then(res => {
        setDetail(res.playlist.tracks)
      })
  }, [activeItem])
  return !playlist?.length ? (
    <div h='full' w='full' flex='~' justify='center' items='center'>
      {LIST_NULL_TEXT}
    </div>
  ) : !activeItem ? (
    <div flex='~ wrap' items='start' w='full' overflow='auto'>
      {playlist.map(item => (
        <div
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
        <MusicList source={detail} rowClick={pushIntoPlayingMusicList} />
      </div>
    </div>
  )
})

export default Mine
