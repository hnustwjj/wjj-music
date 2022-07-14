import { getAllMusic, getPlayListDetail } from '@/service/music'
import { PlayingListItem } from '@/store/user/types'
import { MusicListItem } from '@/store/music/types'
import { useState, useEffect, useMemo } from 'react'

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
  useEffect(() => {
    activeItem?.id &&
      getPlayListDetail(activeItem.id).then(res => {
        setDetail(res.playlist)
        return getAllMusic(res.playlist.trackIds).then(res => {
          setTracks(res.songs)
        })
      })
  }, [activeItem])
  useEffect(() => {
    if (detail?.trackIds) {
    }
  }, [detail])

  const [showLength, setShowLength] = useState(10)
  //TODO:滚动到最后请求下一页
  const showMore = async () => {
    if (detail && detail.trackCount > showLength) {
      setShowLength(showLength + 10)
    }
  }
  const computedTracks = useMemo(() => {
    return tracks?.slice(0, showLength) ?? []
  }, [showLength, tracks])
  return { activeItem, detail, setActiveItem, showMore, computedTracks }
}
