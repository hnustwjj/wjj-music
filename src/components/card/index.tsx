import React, { memo, useState } from 'react'

import { imgUrl } from '@/utils'
import LyricBox from '../../common/lyricBox'
import { PanWrapper, CardWrapper } from './style'
import type { ILyric } from '@/common/lyricBox/hooks/useLyric'
import type { IMusicInfo } from '../../hooks/useMusic'
import type { IAudio } from '../../hooks/useAudio'
//TODO:添加pan的碟片的那根棍子= =

const Card = memo(
  (props: {
    changePageActive: () => void
    musicInfo: IMusicInfo
    lyricInfo: ILyric
    audioInfo: IAudio
    TimeSlider: () => JSX.Element
    VolumeSlider: () => JSX.Element
  }) => {
    const {
      TimeSlider,
      changePageActive,
      musicInfo,
      lyricInfo,
      audioInfo,
      VolumeSlider,
    } = props

    // 是否点击了pan显示card
    const [active, setPanActive] = useState(false)

    // 获取音乐信息相关
    const { al, singers, name: songName } = musicInfo
    // 获取歌词相关信息
    const { currentLyricIndex, lyricList, lyricBoxRef } = lyricInfo
    // 获取音频相关信息
    const {
      switchMusicStaus,
      isPlaying,
      switchMusic,
      volume,
      changeJingyin,
    } = audioInfo

    const BG_STYLE = {
      backgroundImage: `url(${imgUrl(300, al?.picUrl)})`,
    }
    //TODO:检测背景图的明暗，设置不同的color
    return (
      <>
        <PanWrapper className={active ? 'active' : 'deactive'}>
          <div
            className={'bg-pan ' + (isPlaying ? '' : 'pause')}
            rounded='full'
            w='80px'
            h='80px'
            p='13px'
            onClick={() => setPanActive(!active)}
          >
            <img
              className='rounded-full object-cover h-full w-full'
              src={imgUrl(140, al?.picUrl)}
            />
          </div>
        </PanWrapper>
        <CardWrapper
          className={active ? 'active' : ''}
          select='none'
          style={BG_STYLE}
        >
          {/* 三张背景蒙版 */}
          {[5, 2].map(item => (
            <div
              key={item}
              style={BG_STYLE}
              bg='no-repeat cover'
              className={`blur-${item}px`}
              absolute='~'
              rounded='md'
              h='full'
              w='full'
            />
          ))}
          <div
            className='bg-[rgba(0,0,0,.1)]'
            absolute='~'
            rounded='md'
            h='full'
            w='full'
          />
          <div w='250px' flex='~ col' items='center' z='1' h='full'>
            {/* 歌名 */}
            <div
              h='40px'
              text='15px center gray-200'
              leading='60px'
              m='b-20px'
            >
              {songName}
            </div>
            {/* 歌手 */}
            <p
              h='40px'
              text='12px center gray-300'
              leading='20px'
              m='b-20px'
              w='140px'
            >
              歌手：{singers}
            </p>
            {/* 歌词 */}
            <div flex='1' overflow='hidden' relative='~' p='x-15px'>
              <LyricBox
                currentLyricIndex={currentLyricIndex}
                lyricList={lyricList}
                lyricBoxRef={lyricBoxRef}
              />
            </div>
            {/* 控制栏 */}
            <div
              h='40px'
              w='300px'
              flex='~'
              justify='center'
              items='center'
              cursor='pointer'
            >
              <div
                w='20px'
                h='20px'
                flex='~'
                justify='center'
                items='center'
                onClick={() => switchMusicStaus()}
              >
                <i
                  className={`${
                    isPlaying ? 'icon-pause' : 'icon-play'
                  } iconfont text-[13px] text-$icon`}
                />
              </div>
              <div w='240px' p='x-15px' flex='~' justify='center'>
                {TimeSlider}
              </div>
              <div
                w='20px'
                h='20px'
                flex='~'
                items='center'
                justify='center'
                cursor='pointer'
                relative='~'
              >
                <i
                  className={
                    'iconfont volume-slider-hover text-$icon ' +
                    (volume === 0 ? 'icon-jingyin' : 'icon-laba')
                  }
                  onClick={() => changeJingyin()}
                />
                <div
                  absolute='~'
                  h='80px'
                  p='10px'
                  flex='~ col'
                  items='center'
                  bottom='20px'
                  opacity='0'
                  hover='opacity-100'
                >
                  {VolumeSlider}
                </div>
              </div>
            </div>
          </div>
          <i
            className='iconfont icon-gengduo text-$icon'
            top='15px'
            right='15px'
            cursor='pointer'
            absolute='~'
            onClick={() => changePageActive()}
          />
          {/* 切换歌曲的箭头 */}
          <i
            className='iconfont icon-left arrow left-5px text-$icon'
            onClick={() => switchMusic('pre')}
          />
          <i
            className='iconfont icon-right arrow right-5px text-$icon'
            onClick={() => switchMusic('next')}
          />
        </CardWrapper>
      </>
    )
  }
)

export default Card
