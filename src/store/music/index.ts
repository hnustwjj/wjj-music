import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface musicState {
  musicList: any[]
  currentMusic: any
  currentLyric: string
  duration: number
  currentTime: number
  currentLyricIndex:number
}

const initialState: musicState = {
  musicList: [],
  currentMusic: {},
  currentLyric: '',
  duration: 0,
  currentTime: 0,
  currentLyricIndex:0
}

const music = createSlice({
  name: 'music',
  initialState,
  reducers: {
    changeMusicList(state: musicState, actions: PayloadAction<any[]>) {
      state.musicList = actions.payload
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
  changeMusicList,
  changeCurrentMusic,
  changeCurrentLyric,
  changeCurrentTime,
  changeDuration,
  changeCurrentLyricIndex
} = music.actions

// 导出定义的所有异步action
export * from './asyncAction'
