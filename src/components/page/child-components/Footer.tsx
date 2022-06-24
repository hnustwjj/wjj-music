import { IAudio } from '@/hooks/useAudio'
import React, { memo } from 'react'

const Footer = memo(
  (props: {
    audioInfo: IAudio
    TimeSlider: () => JSX.Element
    VolumeSlider: () => JSX.Element
  }) => {
    // 获取音频相关信息
    const {
      switchMusic,
      switchMusicStaus,
      changeJingyin,
      switchOrder,
      isPlaying,
      volume,
      currentOrder,
    } = props.audioInfo
    return (
      <footer
        w='full'
        h='100px'
        flex='~ col'
        justify='center'
        items='center'
      >
        <div flex='~' justify='center' m='b-20px'>
          <p
            className={`iconfont icon-${currentOrder} icon text-18px`}
            onClick={() => switchOrder()}
          />
          <p
            className='iconfont icon-pre icon text-18px'
            onClick={() => switchMusic('pre')}
          />
          <p
            className={`iconfont icon text-22px rounded-bg ${
              isPlaying ? 'icon-pause' : 'icon-play'
            }`}
            onClick={() => switchMusicStaus()}
          />
          <p
            className='iconfont icon-next icon text-18px'
            onClick={() => switchMusic('next')}
          />
          <div
            m='r-5px'
            relative='~'
            flex='~'
            items='center'
            justify='center'
          >
            <i
              className={`iconfont volume-slider-hover icon text-18px ${
                volume === 0 ? 'icon-jingyin' : 'icon-laba'
              } `}
              onClick={() => changeJingyin()}
            />
            <div
              absolute='~'
              h='80px'
              p='10px'
              flex='~ col'
              items='center'
              bottom='25px'
              opacity='0'
              hover='opacity-100'
            >
              {props.VolumeSlider}
            </div>
          </div>
        </div>
        <div className='w-[85%]' flex='~' justify='center'>
          {props.TimeSlider}
        </div>
      </footer>
    )
  }
)

export default Footer
