import { AppDispatch } from '../index'
import { getPlayList } from '@/service/music'
import { changePlayList } from '.'
// 获取用户歌单
//TODO:研究一下redux-thunk的第二个参数getState（还是得多看看RTK官网）
export const fetPlayingList =
  (uid: number) => async (dispatch: AppDispatch) => {
    const res = await getPlayList(uid)
    dispatch(changePlayList(res.playlist))
  }
