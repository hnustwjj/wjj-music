import React, { memo, useState } from 'react'

import { imgUrl } from '@/utils'
import Mine from './child-views/Mine'
import Search from './child-views/Search'
import Recommend from './child-views/Recommend'
// import Listened from './child-views/Listened'
import DivWrapper, { NavButton } from './style'
import LyricBox from '@/common/lyricBox'
import Playing from './child-views/Playing'

import type { IMusicInfo } from '@/hooks/useMusic'
import type { ILyric } from '@/hooks/useLyric'
import type { IAudio } from '@/hooks/useAudio'
import {
  PAGE_SINGER_NULL_TEXT,
  PAGE_SONG_NULL_TEXT,
} from '@/constant'

//TODO:在Slider左右添加歌名、时间戳等显示信息
//TODO:手机端兼容

//TODO:登录
//TODO:使背景切换更自然
const navList = [
  { title: '正在播放', element: <Playing /> },
  { title: '每日推荐', element: <Recommend /> },
  { title: '搜索', element: <Search /> },
  { title: '我的歌单', element: <Mine /> },
  // { title: '我听过的', element: <Listened /> },
]
const Page = memo(
  (props: {
    TimeSlider: () => JSX.Element
    VolumeSlider: () => JSX.Element
    musicInfo: IMusicInfo
    lyricInfo: ILyric
    audioInfo: IAudio
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const {
      TimeSlider,
      musicInfo,
      lyricInfo,
      audioInfo,
      VolumeSlider,
    } = props
    // 获取音乐信息相关
    const { al, singers, name: songName } = musicInfo
    // 获取歌词相关信息
    const { currentLyricIndex, lyricList, lyricBoxRef } = lyricInfo
    // 获取音频相关信息
    const {
      switchMusic,
      switchMusicStaus,
      isPlaying,
      volume,
      changeJingyin,
    } = audioInfo
    return (
      <DivWrapper>
        {/* 两张背景蒙版 */}
        <div
          className='bg-page1 absolute'
          style={{
            backgroundImage: al
              ? `url(${imgUrl(140, al.picUrl)})`
              : ``,
          }}
          h='full'
          w='full'
        />
        <div
          className='bg-[rgba(0,0,0,.5)] absolute'
          h='full'
          w='full'
          z='-1'
        />
        {/* 页头 */}
        <header
          className='leading-[60px] relative'
          h='60px'
          text='center white'
        >
          <a
            href='https://github.com/hnustwjj/wjj-music'
            className='text-[1.35rem]'
          >
            勾勾的音乐组件
          </a>
          <button
            className='absolute right-20px'
            onClick={() => alert('todo')}
          >
            登录
          </button>
        </header>
        {/* 内容 */}
        <div flex='~ 1' w='1700px' p='20px' mx='auto' overflow='auto'>
          <div flex='~ 1 col'>
            <nav h='60px'>
              {navList.map((item, index) => (
                <NavButton
                  className={index === currentIndex ? 'active' : ''}
                  onClick={() => setCurrentIndex(index)}
                  key={item.title}
                >
                  {item.title}
                </NavButton>
              ))}
            </nav>
            <div flex='1 ~ col' text='gray-300' overflow='auto'>
              {/* 达到类似路由的效果 */}
              {navList[currentIndex].element}
            </div>
          </div>
          <aside w='300px' flex='~ col' items='center'>
            <div w='250px' flex='~ col' items='center' h='full'>
              {/* 歌名 */}
              <div
                h='60px'
                text='15px center $song'
                flex='~'
                leading='20px'
                overflow='hidden'
                items='center'
                m='b-10px'
              >
                {songName || PAGE_SONG_NULL_TEXT}
              </div>
              {/* 歌手 */}
              <p
                h='40px'
                text='12px center $singer'
                leading='20px'
                m='b-20px'
                w='140px'
              >
                歌手：{singers || PAGE_SINGER_NULL_TEXT}
              </p>
              {/* 歌词 */}
              <div flex='1' overflow='hidden' relative='~' p='x-16px'>
                <LyricBox
                  leading={10}
                  currentLyricIndex={currentLyricIndex}
                  lyricList={lyricList}
                  lyricBoxRef={lyricBoxRef}
                />
              </div>
            </div>
          </aside>
        </div>
        {/* 控制栏 */}
        <footer
          w='full'
          h='100px'
          flex='~ col'
          justify='center'
          items='center'
        >
          <div flex='~' justify='center' m='b-10px'>
            <p
              className='iconfont icon-random icon text-18px'
              //TODO: 播放顺序控制
              onClick={() => alert('todo')}
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
                {VolumeSlider}
              </div>
            </div>
          </div>
          <div w='full' flex='~' justify='center' px='200px'>
            {TimeSlider}
          </div>
        </footer>
      </DivWrapper>
    )
  }
)

export default Page
