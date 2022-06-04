import { MusicListItem } from '@/store/music/types'
import { AppDispatch } from './../index'
import { getLike, getLyric } from '@/service/music'
import {
  changeDailyMusicList,
  changeCurrentLyric,
  changeCurrentMusic,
  changeCurrentLyricIndex,
  changeCurrentTime,
  changeDuration,
} from '.'

// 获取每日推荐歌曲
export const fetchHotRecommend =
  () => async (dispatch: AppDispatch) => {
    const {
      data: { dailySongs },
    } = await getLike()
    // 保存
    dispatch(changeDailyMusicList(dailySongs))
  }

// 根据id获取歌词
export const changeLyric =
  (item: MusicListItem) => async (dispatch: AppDispatch) => {
    const {
      lrc: { lyric },
    } = await getLyric(item.id ?? 0)
    dispatch(changeCurrentLyric(lyric))
  }

//切换歌曲
export const switchCurrentMusic =
  (item: MusicListItem) => async (dispatch: AppDispatch) => {
    dispatch(changeCurrentMusic(item))
    dispatch(changeLyric(item))
    dispatch(changeCurrentLyricIndex(0))
    dispatch(changeCurrentTime(0))
    dispatch(changeDuration(item.dt ?? 0))
  }
