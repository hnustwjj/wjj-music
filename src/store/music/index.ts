import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface musicState {
  musicList: any[]
  currentMusic: any
  currentLyric: string
}

const initialState: musicState = {
  musicList: [],
  currentMusic: {},
  currentLyric: ''
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
    }
  }
})
export default music.reducer
export const { changeMusicList, changeCurrentMusic, changeCurrentLyric } =
  music.actions

// 导出定义的所有异步action
export * from './asyncAction'
