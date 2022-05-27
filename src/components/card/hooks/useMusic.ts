import { useAppSelector } from '@/store/index'
import { getMusicUrl } from '@/service/music'
interface Singers {
  id: number
  name: string
  tns: []
  alias: []
}

export default function useMusicInfo() {
  // 获取当前歌曲和当前歌词
  const { currentMusic, musicList } = useAppSelector((state) => state.music)
  // 分别是id，歌曲信息，作者，歌曲名
  const { id, al, ar, name } = currentMusic
  // 根据id获取url
  const url = id && getMusicUrl(id)

  // 拼接作者姓名
  let singers = ''
  ar &&
    ar.map((item: Singers, index: number) => {
      singers += item.name
      singers += ar.length === index + 1 ? '' : ' / '
    })

  return { al, singers, name, url, currentMusic, musicList }
}
