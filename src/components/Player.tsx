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
import { getPlayingList } from '@/store/user'
import store, { useAppDispatch, useAppSelector } from '@/store'
import getImpTimeSlider from '../common/slider/implement/TimeSlider'
import getImpVolumeSlider from '../common/slider/implement/VolumeSlider'
import useCanvas from '@/hooks/useCanvas'
import { createPortal } from 'react-dom'

export const RGBContext = createContext({
  R: 0,
  G: 0,
  B: 0,
  average: 0,
})
const App = memo(() => {
  const dispatch = useAppDispatch()
  const { uid } = useAppSelector(state => state.user)
  // 请求热榜推荐歌曲的数据
  useEffect(() => {
    dispatch(fetchHotRecommend())
    dispatch(getPlayingList(uid))
  }, [dispatch])

  // page是否显示
  const [pageActive, setPageActive] = useState(false)
  // 获取音乐信息的Hook
  const musicInfo = useMusicInfo()
  // 获取歌词信息的Hook
  const lyricInfo = useLyric()
  // 为了控制page页面的LyricBox，需要两个LyricBoxRef，所以再调用一次
  const lyricInfo2 = useLyric()
  // 获取图片RGB平均值
  const { CanvasRef, ImgRef, RGB } = useCanvas()
  // 获取音频信息的Hook
  const audioInfo = useAudio()
  const { audioRef, canplay, audioTimeUpdate, onEnd, onError } =
    audioInfo
  // 获取时间进度条
  const TimeSlider = getImpTimeSlider(audioInfo, lyricInfo)
  // 获取音乐进度条
  const VolumeSlider = getImpVolumeSlider(audioInfo)
  return createPortal(
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
    </RGBContext.Provider>,
    document.getElementById('root') as Element
  )
})
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
