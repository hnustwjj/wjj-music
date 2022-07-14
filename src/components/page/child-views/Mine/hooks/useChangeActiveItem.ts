import { getAllMusic, getPlayListDetail } from '@/service/music'
import { PlayingListItem } from '@/store/user/types'
import { MusicListItem } from '@/store/music/types'
import { useState, useEffect, useMemo } from 'react'
import { useAppDispatch } from '@/store'
type Detail = {
  tracks: MusicListItem[]
  trackCount: number
  trackIds?: string[]
}
export default function () {
  // 当前点击的歌单
  const [activeItem, setActiveItem] = useState<PlayingListItem | null>(null)
  const [detail, setDetail] = useState<Detail>()
  const [tracks, setTracks] = useState<MusicListItem[]>()
  // const dispatch = useAppDispatch()
  useEffect(() => {
    activeItem?.id &&
      getPlayListDetail(activeItem.id).then(res => {
        // 先请求到所有trackIds
        setDetail(res.playlist)
        return getAllMusic(res.playlist.trackIds).then(res => {
          // 再根据trackIds获取所有的songs
          setTracks(res.songs)
        })
      })
  }, [activeItem])

  const [showLength, setShowLength] = useState(10)
  // 滚动到底部时触发的回调函数
  const showMore = async () => {
    if (detail && detail.trackCount > showLength) {
      setShowLength(showLength + 10)
    }
  }
  // 截取tracks
  const computedTracks = useMemo(() => {
    return tracks?.slice(0, showLength) ?? []
  }, [showLength, tracks])
  return { activeItem, detail, setActiveItem, showMore, computedTracks }
}
