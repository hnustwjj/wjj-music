export interface MusicListItem {
  name?: string
  id?: number
  ar?: {
    id?: number
    name?: string
  }[]
  al?: {
    id: number
    name: string
    picUrl: string
  }
  dt?: number
  lyric?: string
  initFlag?: boolean
}
export interface musicState {
  // 每日推荐音乐列表
  dailyMusicList: MusicListItem[]
  // 正在播放音乐列表
  playingMusicList: MusicListItem[]
  // 当前音乐信息
  currentMusic: MusicListItem
  // 当前音乐的歌词
  currentLyric: string
  // 当前音乐的时长
  duration: number
  // 当前音乐的事件
  currentTime: number
  // 当前音乐的歌词下标
  currentLyricIndex: number
  // 用于uid
  uid: number
}