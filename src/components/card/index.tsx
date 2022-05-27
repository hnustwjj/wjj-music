import React, { memo, useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { PanWrapper, CardWrapper } from './style'
import store, { useAppDispatch } from '@/store'
import { fetchHotRecommend } from '@/store/music'
import Slider from '../slider'
import useAudio, { INITIAL_VOLUME } from './hooks/useAudio'
import useLyric from './hooks/useLyric'
import useMusicInfo from './hooks/useMusic'
const Card = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // 请求热榜推荐歌曲的数据
    dispatch(fetchHotRecommend())
  }, [dispatch])

  // 是否点击了pan显示card
  const [active, setactive] = useState(false)
  // 获取音乐信息相关的hook
  const {
    al,
    singers,
    name: songName,
    url,
    currentMusic,
    musicList
  } = useMusicInfo()
  // 获取歌词相关信息的hook
  const { updateTime, currentLyricIndex, lyricList, lyricBox } =
    useLyric()

  // 获取音频相关信息的hook
  const {
    switchMusicStaus,
    isPlaying,
    duration,
    audioRef,
    switchMusic,
    canplay,
    setVolume,
    volume
  } = useAudio(musicList, currentMusic)

  // 时间进度条改变事件
  const onTimeSliderChange = (percent: number) => {
    const time = (duration * percent).toFixed()
    updateTime(time, true)
    audioRef.current &&
      (audioRef.current.currentTime = parseInt(time) / 1000)
  }

  // 时间百分比
  const timePercent =
    ((audioRef.current?.currentTime ?? 0) * 1000) / duration

  // 音乐进度条改变事件
  const onVolumeliderChange = (percent: number) => {
    setVolume(percent)
  }

  // 音乐百分比
  const volumePercent = volume

  //TODO:音乐挂起时进行相关操作(onSuspend)
  //TODO:用户代理试图获取媒体数据，但数据意外地没有进入。
  //TODO:切换歌曲进行判断，避免崩溃
  //TODO:点击喇叭，静音
  return (
    <>
      <PanWrapper className={active ? 'active' : 'deactive'}>
        <div
          className={
            'w-80px h-80px rounded-full p-13px bg-pan img-pan ' +
            (isPlaying ? '' : 'pause')
          }
          onClick={() => setactive(!active)}>
          <img className="rounded-full " src={al?.picUrl} />
        </div>
        <audio
          src={url}
          ref={audioRef}
          onTimeUpdate={e => updateTime(e)}
          onCanPlay={e => canplay(e)}
          onEnded={() => switchMusic('next')}
          onError={() => switchMusic('next')}
        />
      </PanWrapper>
      <CardWrapper
        className={'select-none ' + (active ? 'active' : '')}
        style={{
          backgroundImage: `url(${al?.picUrl})`
        }}>
        {/* 三张背景蒙版 */}
        {[5, 10, 2].map(item => (
          <img
            key={item}
            src={al?.picUrl}
            className={`blur-${item}px absolute rounded-md h-full w-full`}
          />
        ))}
        <div className="w-250px flex flex-col items-center h-full z-50">
          {/* 歌名 */}
          <div className="h-40px text-15px text-center text-white leading-60px mb-20px z-55">
            {songName}
          </div>
          {/* 歌手 */}
          <p className="h-40px text-12px text-center text-[hsla(0,0%,100%,.6)] leading-20px mb-20px w-140px ">
            歌手：{singers}
          </p>
          {/* 歌词 */}
          <div className="flex-1 overflow-hidden relative px-15px">
            <div ref={lyricBox}>
              {lyricList.map((item, index) => (
                <p
                  className={
                    'text-12px text-center leading-[1.5] text-[hsla(0,0%,100%,.6)] ' +
                    (currentLyricIndex === index
                      ? 'active-lyric'
                      : '')
                  }
                  key={item.time + item.content}>
                  {item.content}
                </p>
              ))}
            </div>
          </div>
          {/* 控制栏 */}
          <div className="h-40px w-300px flex items-center">
            <div
              onClick={() => switchMusicStaus()}
              className="icon ml-5px">
              {isPlaying ? (
                <i className="iconfont icon-pause text-[13px]" />
              ) : (
                <i className="iconfont icon-play text-[13px]" />
              )}
            </div>
            <div className="w-240px px-15px flex justify-center">
              <Slider
                direction="row"
                initialValue={0}
                change={percent => onTimeSliderChange(percent)}
                value={timePercent}
              />
            </div>
            <div className="icon mr-5px relative">
              <i className="iconfont icon-laba volume-slider-hover" />
              <div className="absolute h-80px py-10px px-10px flex flex-col items-center bottom-20px opacity-0 hover:opacity-100">
                <Slider
                  direction="col"
                  initialValue={INITIAL_VOLUME}
                  value={volumePercent}
                  change={percent => onVolumeliderChange(percent)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 切换歌曲的箭头 */}
        <i
          className="iconfont icon-left arrow left-5px"
          onClick={() => switchMusic('pre')}
        />
        <i
          className="iconfont icon-right arrow right-5px"
          onClick={() => switchMusic('next')}
        />
      </CardWrapper>
    </>
  )
})

export default () => (
  <Provider store={store}>
    <Card />
  </Provider>
)
