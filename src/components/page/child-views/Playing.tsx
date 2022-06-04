import React, { memo } from 'react'
import { useAppDispatch } from '@/store'
import { switchCurrentMusic } from '@/store/music'
import MusicList from '@/common/musicList'
import { MusicListItem } from '@/store/music/types'
const Playing = memo(() => {
  // 修改音乐
  const dispatch = useAppDispatch()
  const switchMusic = (item: MusicListItem) => {
    dispatch(switchCurrentMusic(item))
  }
  return (
    <MusicList source='playingMusicList' rowClick={switchMusic} />
  )
})

export default Playing
