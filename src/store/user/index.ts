import { PlayingListItem } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import useStorage from '@/hooks/useStorage'
export interface userState {
  // 用户uid
  uid: number
  playList: PlayingListItem[]
}
const storage = useStorage()
const initialState: userState = {
  uid: storage.getItem('uid', '0'),
  playList: [],
}

const music = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUid(state: userState, actions: PayloadAction<number>) {
      state.uid = actions.payload
      storage.setItem('uid', state.uid)
    },
    changePlayList(
      state: userState,
      actions: PayloadAction<PlayingListItem[]>
    ) {
      state.playList = actions.payload
      // storage.setItem('playList', state.playList)
    },
  },
})
export default music.reducer

//导出所有的普通action
export const { changeUid, changePlayList } = music.actions

// 导出定义的所有异步action
export * from './asyncAction'
