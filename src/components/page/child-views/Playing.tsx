import React, { memo } from 'react'
import { useAppDispatch } from '@/store'
import { changeCurrentMusic, changeLyric } from '@/store/music'
import MusicList from '@/common/musicList'
import { MusicListItem } from '@/store/music/types'
const Playing = memo(() => {
  // 修改音乐
  // TODO:改成将音乐添加到palyingMusicList列表中
  const dispatch = useAppDispatch()
  const switchMusic = (item: MusicListItem) => {
    dispatch(changeCurrentMusic(item))
    dispatch(changeLyric(item))
  }
  return (
    <MusicList source='playingMusicList' rowClick={switchMusic} />
  )
})

export default Playing
