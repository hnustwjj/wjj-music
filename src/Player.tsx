import { memo, useCallback, useEffect, useState } from 'react'
import Card from './components/card'
import Page from './components/page'

import { Provider } from 'react-redux'
import { fetchHotRecommend } from '@/store/music'
import store, { useAppDispatch } from '@/store'
import Slider from './components/slider'
import useMusicInfo from './components/audio/hooks/useMusic'
import useLyric from './components/lyricBox/hooks/useLyric'
import useAudio from './components/audio/hooks/useAudio'
const App = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // 请求热榜推荐歌曲的数据
    dispatch(fetchHotRecommend())
  }, [dispatch])

  // page是否显示
  const [pageActive, setPageActive] = useState(false)
  // 获取音乐信息的Hook
  const musicInfo = useMusicInfo()
  // 获取歌词信息的Hook
  const lyricInfo = useLyric()
  // 获取音频信息的Hook
  const audioInfo = useAudio(musicInfo.musicList, musicInfo.currentMusic)

  // 时间百分比
  const { audioRef, duration } = audioInfo
  const timePercent = ((audioRef.current?.currentTime ?? 0) * 1000) / duration
  // 时间进度条改变事件
  const onTimeSliderChange = (percent: number) => {
    const time = (duration * percent).toFixed()
    lyricInfo.updateTime(time, true)
    audioRef.current && (audioRef.current.currentTime = parseInt(time) / 1000)
  }

  // Card和Page公用的Slider（用useCallback进行缓存）
  const TimeSlider = useCallback(
    () => (
      <Slider
        direction='row'
        initialValue={0}
        change={percent => onTimeSliderChange(percent)}
        value={timePercent}
      />
    ),
    []
  )
  return (
    <>
      <audio
        src={musicInfo.url}
        onTimeUpdate={e => lyricInfo.updateTime(e)}
        ref={audioInfo.audioRef}
        onCanPlay={e => audioInfo.canplay(e)}
        onEnded={() => audioInfo.switchMusic('next')}
        onError={() => audioInfo.switchMusic('next')}
      />
      <Card
        audioInfo={audioInfo}
        musicInfo={musicInfo}
        lyricInfo={lyricInfo}
        TimeSlider={TimeSlider}
        changePageActive={() => setPageActive(!pageActive)}
      />
      <div
        h='100vh'
        w='100vw'
        className={
          `transition-opacity opacity-0` + (pageActive ? ' opacity-100' : '')
        }>
        <Page TimeSlider={TimeSlider} />
      </div>
    </>
  )
})
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
