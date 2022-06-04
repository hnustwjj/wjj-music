import React, { memo } from 'react'
import { useAppDispatch } from '@/store'
import {
  pushPlayingMusicList,
  switchCurrentMusic,
} from '@/store/music'
import MusicList from '@/common/musicList'
import type { MusicListItem } from '@/store/music/types'
const Recommend = memo(() => {
  // 修改音乐
  const dispatch = useAppDispatch()
  const pushIntoPlayingMusicList = (item: MusicListItem) => {
    dispatch(switchCurrentMusic(item))
    dispatch(pushPlayingMusicList(item))

    //TODO:push成功的dialog
    // alert('push成功')
  }
  return (
    <MusicList
      source='dailyMusicList'
      rowClick={pushIntoPlayingMusicList}
    />
  )
})

export default Recommend
