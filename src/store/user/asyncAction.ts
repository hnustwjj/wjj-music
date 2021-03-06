import { AppDispatch } from '../index'
import { getCookie, getPlayList, getUserInfo } from '@/service/user'
import { changeCookie, changePlayList, changeUserInfo } from '.'
// 获取用户歌单
//TODO:研究一下redux-thunk的第二个参数getState（还是得多看看RTK官网）
export const getPlayingList =
  (uid: number) => async (dispatch: AppDispatch) => {
    if (uid) {
      const res = await getPlayList(uid)
      dispatch(changePlayList(res.playlist))
      return res.playlist
    } else {
      dispatch(changePlayList([]))
      return []
    }
  }

export const getUserInfoAction =
  (uid: number) => async (dispatch: AppDispatch) => {
    if (uid) {
      const res = await getUserInfo(uid)
      dispatch(changeUserInfo(res.profile))
      return res.profile
    } else {
      dispatch(changeUserInfo({}))
      return {}
    }
  }

export const getUserCookie = (key: string) => async (dispatch: AppDispatch) => {
  const { cookie } = await getCookie(key)
  dispatch(changeCookie(cookie))
  return cookie
}
