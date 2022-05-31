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

  const { audioRef, canplay, switchMusic } = audioInfo
  const { TimeSlider, VolumeSlider } = useSliders(
    audioInfo,
    lyricInfo
  )
  return (
    <>
      <audio
        ref={audioRef}
        src={musicInfo.url}
        onTimeUpdate={e => lyricInfo.updateTime(e)}
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
