import { memo, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import Card from './card'
import Page from './page'

import useMusicInfo from '../hooks/useMusic'
import useLyric from '../hooks/useLyric'
import useAudio from '../hooks/useAudio'
import { fetchHotRecommend } from '@/store/music'
import store, { useAppDispatch } from '@/store'
import getTimeAndAudioSlider from '../common/slider/implement/impSliders'
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
  const audioInfo = useAudio()

  const { audioRef, canplay, switchMusic, audioTimeUpdate } =
    audioInfo
  // 获取时间进度条和音量进度条
  const { TimeSlider, VolumeSlider } = getTimeAndAudioSlider(
    audioInfo,
    lyricInfo
  )

  return (
    <div fixed='~' top='0' left='0'>
      <audio
        ref={audioRef}
        src={musicInfo.url}
        onTimeUpdate={e => audioTimeUpdate(e, lyricInfo.updateTime)}
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
  )
})
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
