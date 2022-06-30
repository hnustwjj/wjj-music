import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import useStorage from '@/hooks/useStorage'
import type { MusicListItem, musicState } from './types'

// 初始化状态（initFlag为了判断是否是第一次）
export const initialCurrentMusic = { initFlag: true }
const storage = useStorage()
const initialState: musicState = {
  dailyMusicList: [],
  playingMusicList: storage.getItem('playingMusicList', '[]'),
  currentMusic: initialCurrentMusic,
  currentLyric: '',
  duration: 0,
  currentTime: 0,
  currentLyricIndex: 0,
  uid: storage.getItem('uid', '0'),
}

const music = createSlice({
  name: 'music',
  initialState,
  reducers: {
    changeUid(state: musicState, actions: PayloadAction<number>) {
      state.uid = actions.payload
    },
    changeDailyMusicList(state: musicState, actions: PayloadAction<any[]>) {
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
      storage.setItem('playingMusicList', playingMusicList)
    },
    removeFromPlayingMusicList(
      state: musicState,
      actions: PayloadAction<MusicListItem>
    ) {
      const index = state.playingMusicList.findIndex(
        item => item.id === actions.payload.id
      )
      state.playingMusicList.splice(index, 1)
      storage.setItem('playingMusicList', state.playingMusicList)
    },
    changeCurrentMusic(state: musicState, actions: PayloadAction<any>) {
      state.currentMusic = actions.payload
    },
    changeCurrentLyric(state: musicState, actions: PayloadAction<any>) {
      state.currentLyric = actions.payload
    },
    changeDuration(state: musicState, actions: PayloadAction<number>) {
      state.duration = actions.payload
    },
    changeCurrentTime(state: musicState, actions: PayloadAction<number>) {
      state.currentTime = actions.payload
    },
    changeCurrentLyricIndex(state: musicState, actions: PayloadAction<number>) {
      state.currentLyricIndex = actions.payload
    },
  },
})
export default music.reducer

//导出所有的普通action
export const {
  changeUid,
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
