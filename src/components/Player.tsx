import React, {
  createContext,
  memo,
  useEffect,
  useState,
} from 'react'
import { Provider } from 'react-redux'
import Card from './card'
import Page from './page'

import useMusicInfo from '../hooks/useMusic'
import useLyric from '../hooks/useLyric'
import useAudio from '../hooks/useAudio'
import { fetchHotRecommend } from '@/store/music'
import store, { useAppDispatch, useAppSelector } from '@/store'
import getImpTimeSlider from '../common/slider/implement/TimeSlider'
import getImpVolumeSlider from '../common/slider/implement/VolumeSlider'
import useStorage from '@/hooks/useStorage'
import useCanvas from '@/hooks/useCanvas'

export const RGBContext = createContext({
  R: 0,
  G: 0,
  B: 0,
  average: 0,
})
//TODO: 在error的时候提示音乐无法播放，否则效果很不好
const App = memo(() => {
  const dispatch = useAppDispatch()
  // 请求热榜推荐歌曲的数据
  useEffect(() => {
    dispatch(fetchHotRecommend())
  }, [dispatch])

  // 如果正在播放数组改变，就重新缓存
  const storage = useStorage()
  const { playingMusicList } = useAppSelector(state => state.music)
  useEffect(() => {
    storage.setItem('playingMusicList', playingMusicList)
  }, [playingMusicList])

  // page是否显示
  const [pageActive, setPageActive] = useState(false)
  // 获取音乐信息的Hook
  const musicInfo = useMusicInfo()
  // 获取歌词信息的Hook
  const lyricInfo = useLyric()
  // 为了控制page页面的LyricBox，需要两个LyricBoxRef，所以再调用一次
  const lyricInfo2 = useLyric()
  // 获取音频信息的Hook
  const audioInfo = useAudio()
  const { audioRef, canplay, audioTimeUpdate, onEnd, onError } =
    audioInfo
  // 获取时间进度条
  const TimeSlider = getImpTimeSlider(audioInfo, lyricInfo)
  // 获取音乐进度条
  const VolumeSlider = getImpVolumeSlider(audioInfo)
  // 获取图片RGB平均值
  const { CanvasRef, ImgRef, RGB } = useCanvas()

  return (
    <RGBContext.Provider value={RGB}>
      <div fixed='~' top='0' left='0'>
        <canvas
          ref={CanvasRef}
          width='80px'
          height='80px'
          fixed='~'
          invisible='~'
        />
        <audio
          ref={audioRef}
          src={musicInfo.url ?? ''}
          onTimeUpdate={e => audioTimeUpdate(e, lyricInfo.updateTime)}
          onCanPlay={e => canplay(e)}
          onEnded={() => onEnd()}
          onError={() => onError()}
        />
        <Card
          audioInfo={audioInfo}
          musicInfo={musicInfo}
          lyricInfo={lyricInfo}
          ImgRef={ImgRef}
          TimeSlider={TimeSlider}
          VolumeSlider={VolumeSlider}
          changePageActive={() => setPageActive(!pageActive)}
        />

        <div
          h='100vh'
          w='100vw'
          fixed='~'
          z='$page-index'
          className={`transition transform ${
            pageActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <Page
            VolumeSlider={VolumeSlider}
            audioInfo={audioInfo}
            lyricInfo={lyricInfo2}
            TimeSlider={TimeSlider}
            musicInfo={musicInfo}
          />
        </div>
      </div>
    </RGBContext.Provider>
  )
})
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
