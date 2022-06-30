import React, { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  fetchHotRecommend,
  pushPlayingMusicList,
  switchCurrentMusic,
} from '@/store/music'
import MusicList from '@/common/musicList'
import type { MusicListItem } from '@/store/music/types'
const Recommend = memo(() => {
  // 修改音乐
  const dispatch = useAppDispatch()
  const { dailyMusicList } = useAppSelector(state => state.music)
  useEffect(() => {
    // 请求热榜推荐歌曲的数据
    if (!dailyMusicList.length) dispatch(fetchHotRecommend())
  }, [dispatch])
  const pushIntoPlayingMusicList = (item: MusicListItem) => {
    dispatch(switchCurrentMusic(item))
    dispatch(pushPlayingMusicList(item))
    //TODO:push成功的dialog
    // alert('push成功')
  }
  return (
    <MusicList source={dailyMusicList} rowClick={pushIntoPlayingMusicList} />
  )
})

export default Recommend
