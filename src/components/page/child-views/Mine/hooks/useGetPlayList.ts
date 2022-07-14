import { useAppSelector } from '@/store'
import useSWR from 'swr'
import { getPlayList } from '@/service/user'
const fetchePlayList = uid => {
  return getPlayList(Number(uid)).then(
    res => new Promise(resolve => setTimeout(resolve, 500, res))
  )
}
export default function () {
  // 歌单数据
  const { uid } = useAppSelector(state => state.user)
  // Suspense优化？？？
  // 最终决定不放在store中了
  const res = useSWR<any>(uid + '', fetchePlayList, { suspense: true })
  const playlist = res.data.playlist
  return playlist
}
