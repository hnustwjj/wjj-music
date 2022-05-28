import React, { memo, useState } from 'react'

import Slider from '../slider'
import { imgUrl } from '@/utils'
import useLyric from './hooks/useLyric'
import useMusicInfo from './hooks/useMusic'
import { PanWrapper, CardWrapper } from './style'
import useAudio, { INITIAL_VOLUME } from './hooks/useAudio'

//需要放在最外面，否则每次执行函数都会重新创建变量
let volumeCache = 0
let isJingyin = false

const Card = memo((props: { changePageActive: () => void }) => {
  const { changePageActive } = props
  // 是否点击了pan显示card
  const [active, setPanActive] = useState(false)

  // 获取音乐信息相关的hook
  const {
    al,
    singers,
    name: songName,
    url,
    currentMusic,
    musicList,
  } = useMusicInfo()
  // 获取歌词相关信息的hook
  const { updateTime, currentLyricIndex, lyricList, lyricBox } = useLyric()

  // 获取音频相关信息的hook
  const {
    switchMusicStaus,
    isPlaying,
    duration,
    audioRef,
    switchMusic,
    canplay,
    setVolume,
    volume,
  } = useAudio(musicList, currentMusic)

  // 时间进度条改变事件
  const onTimeSliderChange = (percent: number) => {
    const time = (duration * percent).toFixed()
    updateTime(time, true)
    audioRef.current && (audioRef.current.currentTime = parseInt(time) / 1000)
  }

  // 时间百分比
  const timePercent = ((audioRef.current?.currentTime ?? 0) * 1000) / duration

  // 音乐进度条改变事件
  const onVolumeliderChange = (percent: number) => {
    setVolume(percent)
  }

  const changeJingyin = () => {
    // isJingyin和volumnCache放在函数外，防止每次执行函数都重新声明变量
    if (!isJingyin) {
      volumeCache = volume
      setVolume(0)
    } else {
      setVolume(volumeCache)
    }
    isJingyin = !isJingyin
  }

  return (
    <>
      <PanWrapper className={active ? 'active' : 'deactive'}>
        <div
          className={'bg-pan ' + (isPlaying ? '' : 'pause')}
          rounded='full'
          w='80px'
          h='80px'
          p='13px'
          onClick={() => setPanActive(!active)}>
          <img className='rounded-full ' src={imgUrl(140, al?.picUrl)} />
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
        className={active ? 'active' : ''}
        select='none'
        style={{
          background: al?.picUrl
            ? `url(${imgUrl(300, al.picUrl)})`
            : `rgba(0,0,0,.15)`,
        }}>
        <i
          className='iconfont icon-gengduo icon-color'
          z='52'
          top='15px'
          right='15px'
          cursor='pointer'
          absolute='~'
          onClick={() => changePageActive()}
        />
        {/* 三张背景蒙版 */}
        {[5, 10, 2].map(item => (
          <img
            key={item}
            src={imgUrl(300, al?.picUrl)}
            className={`blur-${item}px`}
            absolute='~'
            rounded='md'
            h='full'
            w='full'
          />
        ))}
        <div w='250px' flex='~ col' items='center' h='full' z='50'>
          {/* 歌名 */}
          <div
            h='40px'
            text='15px center white'
            leading='60px'
            m='b-20px'
            z='55'>
            {songName}
          </div>
          {/* 歌手 */}
          <p
            h='40px'
            text='12px center gray-300'
            leading='20px'
            m='b-20px'
            w='140px'>
            歌手：{singers}
          </p>
          {/* 歌词 */}
          <div flex='1' overflow='hidden' relative='~' p='x-15px'>
            <div ref={lyricBox}>
              {lyricList.map((item, index) => (
                <p
                  text='12px center gray-300'
                  leading='23px'
                  className={currentLyricIndex === index ? 'active-lyric' : ''}
                  key={item.time + item.content}>
                  {item.content}
                </p>
              ))}
            </div>
          </div>
          {/* 控制栏 */}
          <div h='40px' w='300px' flex='~' items='center'>
            <div m='l-5px' onClick={() => switchMusicStaus()} className='icon'>
              {isPlaying ? (
                <i className='iconfont icon-pause text-[13px] icon-color' />
              ) : (
                <i className='iconfont icon-play text-[13px] icon-color' />
              )}
            </div>
            <div w='240px' p='x-15px' flex='~' justify='center'>
              <Slider
                direction='row'
                initialValue={0}
                change={percent => onTimeSliderChange(percent)}
                value={timePercent}
              />
            </div>
            <div className='icon' m='r-5px' relative='~'>
              <i
                className={
                  'iconfont volume-slider-hover icon-color ' +
                  (volume === 0 ? 'icon-jingyin' : 'icon-laba')
                }
                onClick={() => changeJingyin()}
              />
              <div
                absolute='~'
                h='80px'
                p='y-10px x-10px'
                flex='~ col'
                items='center'
                bottom='20px'
                opacity='0'
                hover='opacity-100'>
                <Slider
                  direction='col'
                  initialValue={INITIAL_VOLUME}
                  value={volume}
                  change={percent => onVolumeliderChange(percent)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 切换歌曲的箭头 */}
        <i
          className='iconfont icon-left arrow left-5px icon-color'
          onClick={() => switchMusic('pre')}
        />
        <i
          className='iconfont icon-right arrow right-5px icon-color'
          onClick={() => switchMusic('next')}
        />
      </CardWrapper>
    </>
  )
})

export default Card
