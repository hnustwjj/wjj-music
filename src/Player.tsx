import { memo, useMemo, useEffect, useState } from 'react'
import Card from './components/card'
import Page from './components/page'

import { Provider } from 'react-redux'
import { fetchHotRecommend } from '@/store/music'
import store, { useAppDispatch } from '@/store'
import Slider from './common/slider'
import useMusicInfo from './hooks/useMusic'
import useLyric from './common/lyricBox/hooks/useLyric'
import useAudio from './hooks/useAudio'
import { INITIAL_VOLUME } from '@/hooks/useAudio'
let preVolume = 0
const App = memo(() => {
  const dispatch = useAppDispatch()
  // 请求热榜推荐歌曲的数据
  useEffect(() => {
    dispatch(fetchHotRecommend())
  }, [dispatch])

  // page是否显示
  const [pageActive, setPageActive] = useState(false)
  // 获取音乐信息的Hook
  const musicInfo = useMusicInfo()
  // 获取歌词信息的Hook
  const lyricInfo = useLyric()
  // 获取音频信息的Hook
  const audioInfo = useAudio(
    musicInfo.musicList,
    musicInfo.currentMusic
  )

  // 时间百分比
  const { audioRef, duration } = audioInfo
  const timePercent =
    ((audioRef.current?.currentTime ?? 0) * 1000) / duration
  // 时间进度条改变事件
  const onTimeSliderChange = (percent: number) => {
    const time = (duration * percent).toFixed()
    lyricInfo.updateTime(time, true)
    if (audioRef.current) {
      audioRef.current.currentTime = parseInt(time) / 1000
    }
  }
  // Card和Page公用的TimeSlider
  const TimeSlider = useMemo(
    () => (
      <Slider
        direction='row'
        initialValue={0}
        onMouseDown={() => {
          if (audioRef.current) {
            preVolume = audioRef.current.volume
            audioRef.current.volume = 0
          }
        }}
        onMouseUp={() => {
          if (audioRef.current) audioRef.current.volume = preVolume
        }}
        change={percent => onTimeSliderChange(percent)}
        value={timePercent}
      />
    ),
    [onTimeSliderChange, timePercent]
  )
  // 音量进度条改变事件
  const onVolumeliderChange = (percent: number) => {
    audioInfo.setVolume(percent)
  }
  // Card和Page公用的VolumeSlider
  const VolumeSlider = useMemo(
    () => (
      <Slider
        direction='col'
        initialValue={INITIAL_VOLUME}
        value={audioInfo.volume}
        change={percent => onVolumeliderChange(percent)}
      />
    ),
    [onTimeSliderChange, timePercent]
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
        VolumeSlider={VolumeSlider}
        changePageActive={() => setPageActive(!pageActive)}
      />
      <div
        h='100vh'
        w='100vw'
        className={
          `transition transform ` +
          (pageActive
            ? ' scale-100 opacity-100'
            : 'scale-0 opacity-0')
        }>
        <Page TimeSlider={TimeSlider} musicInfo={musicInfo} />
      </div>
    </>
  )
})
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
