import React, { memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  removeFromPlayingMusicList,
  switchCurrentMusic,
} from '@/store/music'
import MusicList from '@/common/musicList'
import { MusicListItem } from '@/store/music/types'
import useAudio from '@/hooks/useAudio'
const Playing = memo(() => {
  const { currentMusic } = useAppSelector(state => state.music)
  const dispatch = useAppDispatch()
  const { switchMusic } = useAudio()
  // 点击列表音乐时，切换音乐
  const rowClick = (item: MusicListItem) => {
    dispatch(switchCurrentMusic(item))
  }
  const remove = (item: MusicListItem) => {
    // 如果是相同的，就先跳到下一首，再删除
    if (currentMusic === item) {
      switchMusic('next')
    }
    dispatch(removeFromPlayingMusicList(item))
  }
  return (
    <MusicList
      source='playingMusicList'
      deleteClick={remove}
      rowClick={rowClick}
    />
  )
})

export default Playing
