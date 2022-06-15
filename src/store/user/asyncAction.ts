import { AppDispatch } from '../index'
import { getPlayList, getUserInfo } from '@/service/user'
import { changePlayList, changeUserInfo } from '.'
// 获取用户歌单
//TODO:研究一下redux-thunk的第二个参数getState（还是得多看看RTK官网）
export const getPlayingList =
  (uid: number) => async (dispatch: AppDispatch) => {
    const res = await getPlayList(uid)
    dispatch(changePlayList(res.playlist))
  }

export const getUserInfoAction =
  (uid: number) => async (dispatch: AppDispatch) => {
    const res = await getUserInfo(uid)
    dispatch(changeUserInfo(res.profile))
  }
