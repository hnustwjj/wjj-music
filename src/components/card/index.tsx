import React, { memo, useState } from 'react'

import LyricBox from '../../common/lyricBox'
import { PanWrapper, CardWrapper } from './style'
import { imgUrl } from '@/utils'
import { ILyric } from '@/common/lyricBox/hooks/useLyric'
import { IMusicInfo } from '../../hooks/useMusic'
import { IAudio } from '../../hooks/useAudio'
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
    const { currentLyricIndex, lyricList, lyricBox } = lyricInfo
    // 获取音频相关信息
    const {
      switchMusicStaus,
      isPlaying,
      switchMusic,
      volume,
      changeJingyin,
    } = audioInfo

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
            onClick={() => setPanActive(!active)}>
            <img
              className='rounded-full '
              src={imgUrl(140, al?.picUrl)}
            />
          </div>
        </PanWrapper>
        <CardWrapper
          className={active ? 'active' : ''}
          select='none'
          style={{
            background: `url(${imgUrl(300, al?.picUrl)})`,
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
          {[5, 2].map(item => (
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
              text='15px center gray-200'
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
              <LyricBox
                currentLyricIndex={currentLyricIndex}
                lyricList={lyricList}
                lyricBox={lyricBox}
              />
            </div>
            {/* 控制栏 */}
            <div h='40px' w='300px' flex='~' items='center'>
              <div
                m='l-5px'
                onClick={() => switchMusicStaus()}
                className='icon'>
                {isPlaying ? (
                  <i className='iconfont icon-pause text-[13px] icon-color' />
                ) : (
                  <i className='iconfont icon-play text-[13px] icon-color' />
                )}
              </div>
              <div w='240px' p='x-15px' flex='~' justify='center'>
                {TimeSlider}
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
                  {VolumeSlider}
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
  }
)

export default Card
