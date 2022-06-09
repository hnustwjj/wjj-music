import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetPlayingList } from '@/store/user'
import React, { memo } from 'react'

const Mine = memo(() => {
  const { uid } = useAppSelector(state => state.music)
  const dispatch = useAppDispatch()
  // 请求热榜推荐歌曲的数据
  useEffect(() => {
    dispatch(fetPlayingList(uid))
  }, [dispatch])
  return <div>Mine</div>
})

export default Mine
