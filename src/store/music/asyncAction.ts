import { MusicListItem } from '@/store/music/types'
import { AppDispatch } from './../index'
import { getLike, getLyric } from '@/service/music'
import { changeDailyMusicList, changeCurrentLyric } from '.'

// 获取每日推荐歌曲
export const fetchHotRecommend =
  () => async (dispatch: AppDispatch) => {
    const {
      data: { dailySongs },
    } = await getLike()
    // 保存
    dispatch(changeDailyMusicList(dailySongs))
    // 默认当前歌曲是第一个对象
    // dispatch(changeCurrentMusic(tracks[0]))
    // 获取并修改currentLyric歌词
    // dispatch(changeLyric(tracks[0].id))
  }

// 根据id获取歌词
export const changeLyric =
  (item: MusicListItem) => async (dispatch: AppDispatch) => {
    const {
      lrc: { lyric },
    } = await getLyric(item.id ?? 0)
    dispatch(changeCurrentLyric(lyric))
  }
