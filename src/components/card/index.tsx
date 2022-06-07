import React, { memo, useContext, useEffect, useState } from 'react'

import { imgUrl } from '@/utils'
import LyricBox from '../../common/lyricBox'
import { PanWrapper, CardWrapper } from './style'
import { RGBContext } from '../Player'

import type { ILyric } from '@/hooks/useLyric'
import type { IMusicInfo } from '../../hooks/useMusic'
import type { IAudio } from '../../hooks/useAudio'
//TODO:添加pan的碟片的那根棍子= =
const Card = memo(
  (props: {
    changePageActive: () => void
    musicInfo: IMusicInfo
    lyricInfo: ILyric
    ImgRef: React.RefObject<HTMLImageElement>
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
      ImgRef,
    } = props
    const RGB = useContext(RGBContext)
    useEffect(() => {
      console.log(RGB)
    }, [RGB])
    // 是否点击了pan显示card
    const [active, setPanActive] = useState(false)
    // 获取音乐信息相关
    const { al, singers, name: songName, currentMusic } = musicInfo
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

    //TODO:优化歌名的样式问题
    const content = (
      <>
        <div w='250px' flex='~ col' items='center' z='1' h='full'>
          {/* 歌名 */}
          <div
            h='60px'
            text='15px center $song'
            leading='20px'
            flex='~'
            overflow='hidden'
            items='center'
            m='b-10px'
          >
            {songName}
          </div>
          {/* 歌手 */}
          <p
            h='40px'
            text='12px center $singer'
            leading='20px'
            m='b-10px'
            w='140px'
          >
            歌手：{singers}
          </p>
          {/* 歌词 */}
          <div
            flex='1'
            overflow='hidden'
            m='b-25px'
            relative='~'
            p='x-15px'
          >
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

        {/* 切换歌曲的箭头 */}
        <i
          className='iconfont icon-left arrow left-5px text-$icon'
          onClick={() => switchMusic('pre')}
        />
        <i
          className='iconfont icon-right arrow right-5px text-$icon'
          onClick={() => switchMusic('next')}
        />
      </>
    )
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
              ref={ImgRef}
              className='rounded-full object-cover h-full w-full'
              src={imgUrl(80, al?.picUrl)}
            />
          </div>
        </PanWrapper>
        <CardWrapper className={active ? 'active' : ''} select='none'>
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
            className={
              RGB.average > 160
                ? 'bg-[rgba(0,0,0,.35)]'
                : 'bg-[rgba(0,0,0,.1)]'
            }
            absolute='~'
            rounded='md'
            h='full'
            w='full'
          />
          {!currentMusic.initFlag ? (
            content
          ) : (
            <div
              h='$card-height'
              flex='~'
              items='center'
              z='50'
              text='$font center 15px'
              leading='20px'
            >
              什么都没有哦~
              <br />
              快点击卡片右上角的按钮~
              <br />
              去选择你喜欢的音乐吧~
            </div>
          )}
          {/* 更多按钮 */}
          <i
            className='iconfont icon-gengduo text-$icon'
            top='15px'
            right='15px'
            cursor='pointer'
            absolute='~'
            onClick={() => changePageActive()}
          />
        </CardWrapper>
      </>
    )
  }
)

export default Card
