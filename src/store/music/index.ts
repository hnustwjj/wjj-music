import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import useStorage from '@/hooks/useStorage'
import type { MusicListItem } from './types'
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
}
export const initialCurrentMusic = { initFlag: true }
const initialState: musicState = {
  dailyMusicList: [],
  playingMusicList: useStorage().getItem('playingMusicList', '[]'),
  currentMusic: initialCurrentMusic,
  currentLyric: '',
  duration: 0,
  currentTime: 0,
  currentLyricIndex: 0,
}

const music = createSlice({
  name: 'music',
  initialState,
  reducers: {
    changeDailyMusicList(
      state: musicState,
      actions: PayloadAction<any[]>
    ) {
      state.dailyMusicList = actions.payload
    },
    pushPlayingMusicList(
      state: musicState,
      actions: PayloadAction<MusicListItem>
    ) {
      const { playingMusicList } = state
      //去重插入
      !playingMusicList.find(item => item.id === actions.payload.id)
        ? playingMusicList.push(actions.payload)
        : null
    },
    removeFromPlayingMusicList(
      state: musicState,
      actions: PayloadAction<MusicListItem>
    ) {
      const index = state.playingMusicList.findIndex(
        item => item.id === actions.payload.id
      )
      state.playingMusicList.splice(index, 1)
    },
    changeCurrentMusic(
      state: musicState,
      actions: PayloadAction<any>
    ) {
      state.currentMusic = actions.payload
    },
    changeCurrentLyric(
      state: musicState,
      actions: PayloadAction<any>
    ) {
      state.currentLyric = actions.payload
    },
    changeDuration(
      state: musicState,
      actions: PayloadAction<number>
    ) {
      state.duration = actions.payload
    },
    changeCurrentTime(
      state: musicState,
      actions: PayloadAction<number>
    ) {
      state.currentTime = actions.payload
    },
    changeCurrentLyricIndex(
      state: musicState,
      actions: PayloadAction<number>
    ) {
      state.currentLyricIndex = actions.payload
    },
  },
})
export default music.reducer

//导出所有的普通action
export const {
  changeDailyMusicList,
  pushPlayingMusicList,
  changeCurrentMusic,
  changeCurrentLyric,
  changeCurrentTime,
  changeDuration,
  changeCurrentLyricIndex,
  removeFromPlayingMusicList,
} = music.actions

// 导出定义的所有异步action
export * from './asyncAction'
