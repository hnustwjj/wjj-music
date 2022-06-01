import React, { memo, useState } from 'react'

import { imgUrl } from '@/utils'
import Mine from './components/Mine'
import Search from './components/Search'
import Playing from './components/Playing'
import Listened from './components/Listened'
import DivWrapper, { NavButton } from './style'
import LyricBox from '@/common/lyricBox'
// import Recommend from './components/Recommend'

import type { IMusicInfo } from '@/hooks/useMusic'
import { ILyric } from '@/common/lyricBox/hooks/useLyric'

//TODO:手机端兼容

//TODO:登录
//TODO:使背景切换更自然
const navList = [
  { title: '每日推荐', element: <Playing /> },
  // { title: '推荐', element: <Recommend /> },
  { title: '搜索', element: <Search /> },
  { title: '我的歌单', element: <Mine /> },
  { title: '我听过的', element: <Listened /> },
]
const Page = memo(
  (props: {
    TimeSlider: () => JSX.Element
    musicInfo: IMusicInfo
    lyricInfo: ILyric
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { TimeSlider, musicInfo, lyricInfo } = props
    // 获取音乐信息相关
    const { al, singers, name: songName } = musicInfo
    // 获取歌词相关信息
    const { currentLyricIndex, lyricList, lyricBoxRef } = lyricInfo
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
          z='-2'
        />
        <div
          className='bg-[rgba(0,0,0,.5)] absolute'
          z='-1'
          h='full'
          w='full'
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
            onClick={() => console.log('todo')}
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
              {navList[currentIndex].element}
            </div>
          </div>
          <aside w='300px' flex='~ col' items='center'>
            <div
              w='250px'
              flex='~ col'
              items='center'
              h='full'
              z='50'
            >
              {/* 歌名 */}
              <div
                h='40px'
                text='15px center gray-200'
                leading='60px'
                m='b-20px'
                z='55'
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
              <div flex='1' overflow='hidden' relative='~' p='x-16px'>
                <LyricBox
                  leading={35}
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
          h='80px'
          px='200px'
          flex='~'
          justify='center'
          items='center'
        >
          {TimeSlider}
        </footer>
      </DivWrapper>
    )
  }
)

export default Page
