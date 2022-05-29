import { memo, useEffect, useState } from 'react'
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
  //TODO:抽离出Slider
  // const timeSlider = <Slider />
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
        changePageActive={() => setPageActive(!pageActive)}
      />
      <div
        h='100vh'
        w='100vw'
        className={
          `transition-opacity opacity-0` + (pageActive ? ' opacity-100' : '')
        }>
        <Page />
      </div>
    </>
  )
})
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
