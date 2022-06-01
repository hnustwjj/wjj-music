import { memo, useEffect, useState } from 'react'
import Card from './components/card'
import Page from './components/page'

import { Provider } from 'react-redux'
import { fetchHotRecommend } from '@/store/music'
import store, { useAppDispatch } from '@/store'
import useMusicInfo from './hooks/useMusic'
import useLyric from './common/lyricBox/hooks/useLyric'
import useAudio from './hooks/useAudio'
import useSliders from './hooks/useSliders'

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
  // 为了控制page页面的LyricBox，需要两个LyricBoxRef，所以再调用一次
  const lyricInfo2 = useLyric()
  // 获取音频信息的Hook
  const audioInfo = useAudio(
    musicInfo.musicList,
    musicInfo.currentMusic
  )

  const { audioRef, canplay, switchMusic, duration } = audioInfo
  // 获取时间进度条和音量进度条
  const { TimeSlider, VolumeSlider } = useSliders(
    audioInfo,
    lyricInfo
  )

  const audioTimeUpdate = (e: any) => {
    if (audioRef.current) {
      // 获取timeRange
      const timeRanges = audioRef.current.buffered
      // 最后一个timeRange对象
      const last = timeRanges.length - 1
      // 当最后一个timeRange对象存在时，可以获取到当前缓冲区的长度（单位是s）
      if (last >= 0) {
        //TODO:增加已加载的进度条功能
        // console.log(timeRanges.end(last), duration)
      }
    }
    // 会修改全局的currentTime和currentLyricIndex
    lyricInfo.updateTime(e)
  }
  return (
    <>
      <audio
        ref={audioRef}
        src={musicInfo.url}
        onTimeUpdate={e => audioTimeUpdate(e)}
        onCanPlay={e => canplay(e)}
        onEnded={() => switchMusic('next')}
        onError={() => switchMusic('next')}
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
        }
      >
        <Page
          lyricInfo={lyricInfo2}
          TimeSlider={TimeSlider}
          musicInfo={musicInfo}
        />
      </div>
    </>
  )
})
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
