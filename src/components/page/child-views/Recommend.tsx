import React, { memo } from 'react'
import { useAppDispatch } from '@/store'
import {
  pushPlayingMusicList,
  switchCurrentMusic,
} from '@/store/music'
import MusicList from '@/common/musicList'
const Recommend = memo(() => {
  // 修改音乐
  const dispatch = useAppDispatch()
  const pushIntoPlayingMusicList = item => {
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
