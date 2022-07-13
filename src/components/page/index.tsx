import React, { memo, useState, Suspense } from 'react'

import { imgUrl } from '@/utils'
import Mine from './child-views/Mine'
import Search from './child-views/Search'
import Recommend from './child-views/Recommend'
import Header from './child-components/Header'
import DivWrapper, { NavButton } from './style'
import Playing from './child-views/Playing'
import Footer from './child-components/Footer'
import Music from './child-components/Music'

import type { IMusicInfo } from '@/hooks/useMusic'
import type { ILyric } from '@/hooks/useLyric'
import type { IAudio } from '@/hooks/useAudio'
//TODO:手机端兼容
//TODO:使背景切换更自然
const navList = [
  { title: '正在播放', element: <Playing /> },
  { title: '每日推荐', element: <Recommend /> },
  { title: '搜索', element: <Search /> },
  { title: '我的歌单', element: <Mine /> },
]
const Page = memo(
  (props: {
    TimeSlider: () => JSX.Element
    VolumeSlider: () => JSX.Element
    musicInfo: IMusicInfo
    lyricInfo: ILyric
    audioInfo: IAudio
  }) => {
    // 切换content
    const [currentIndex, setCurrentIndex] = useState(0)
    const { musicInfo, lyricInfo, audioInfo, TimeSlider, VolumeSlider } = props
    // 获取音乐信息相关
    const { al } = musicInfo

    return (
      <DivWrapper>
        {/* 两张背景蒙版 */}
        <div
          className='bg-page1 absolute'
          style={{
            backgroundImage: al ? `url(${imgUrl(140, al.picUrl)})` : ``,
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
        <Header />
        {/* 内容 */}
        <div
          flex='~ 1'
          className='w-[80%] <lg:(w-[95%])'
          p='20px'
          mx='auto'
          overflow='auto'
        >
          <div flex='~ 1 col'>
            {/* 导航栏 */}
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
            <div flex='1 ~ col' text='gray-300' overflow='hidden'>
              <Suspense
                fallback={
                  <div
                    w='full'
                    h='full'
                    flex='~'
                    items='center'
                    justify='center'
                  >
                    loading...
                  </div>
                }
              >
                {/* 达到类似路由的效果 */}
                {navList[currentIndex].element}
              </Suspense>
            </div>
          </div>
          <Music musicInfo={musicInfo} lyricInfo={lyricInfo} />
        </div>
        <Footer
          audioInfo={audioInfo}
          TimeSlider={TimeSlider}
          VolumeSlider={VolumeSlider}
        />
      </DivWrapper>
    )
  }
)

export default Page
