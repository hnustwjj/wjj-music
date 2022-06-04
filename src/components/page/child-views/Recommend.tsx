import React, { memo, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { pushPlayingMusicList } from '@/store/music'
import MusicList from '@/common/musicList'
const Recommend = memo(() => {
  // 修改音乐
  // TODO:改成将音乐添加到palyingMusicList列表中
  const dispatch = useAppDispatch()
  const { playingMusicList } = useAppSelector(state => state.music)
  // 阻止第一次执行effect副作用
  const [first, setfirst] = useState(true)
  useEffect(() => {
    if (first) {
      setfirst(false)
    } else {
      //TODO:push成功的dialog
      alert('push成功')
    }
  }, [playingMusicList])

  const pushIntoPlayingMusicList = item => {
    dispatch(pushPlayingMusicList(item))
  }
  return (
    <MusicList
      source='dailyMusicList'
      rowClick={pushIntoPlayingMusicList}
    />
  )
})

export default Recommend
