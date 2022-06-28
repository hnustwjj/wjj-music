import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import useStorage from '@/hooks/useStorage'
import type { PlayingListItem, UserInfo } from './types'

export interface userState {
  // 用户uid
  uid: number
  playList: PlayingListItem[]
  userInfo: UserInfo
}
const storage = useStorage()
const initialState: userState = {
  uid: storage.getItem('uid', '0'),
  userInfo: {},
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
    changeUserInfo(state: userState, actions: PayloadAction<UserInfo>) {
      state.userInfo = actions.payload
    },
  },
})
export default music.reducer

//导出所有的普通action
export const { changeUid, changePlayList, changeUserInfo } = music.actions

// 导出定义的所有异步action
export * from './asyncAction'
