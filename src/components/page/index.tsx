import React, { memo, useState } from 'react'
import DivWrapper, { NavButton } from './style'

import { imgUrl } from '@/utils'
import Playing from './components/Playing'
import Recommend from './components/Recommend'
import Search from './components/Search'
import Mine from './components/Mine'
import Listened from './components/Listened'
import { useAppSelector } from '@/store'
import Slider from '../slider'
//TODO:手机端兼容
// 1：header手机端看不清

//TODO:登录
const navList = [
  { title: '正在播放', element: <Playing /> },
  { title: '推荐', element: <Recommend /> },
  { title: '搜索', element: <Search /> },
  { title: '我的歌单', element: <Mine /> },
  { title: '我听过的', element: <Listened /> },
]
const Page = memo(() => {
  const {
    currentMusic: { al },
    currentTime,
    duration,
  } = useAppSelector(state => state.music)
  const [currentIndex, setCurrentIndex] = useState(0)
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
        z='-2'
      />
      <div className='bg-[rgba(0,0,0,.5)] absolute' z='-1' h='full' w='full' />
      {/* 页头 */}
      <header className='leading-[60px] relative' h='60px' text='center white'>
        <a
          href='https://github.com/hnustwjj/wjj-music'
          className='text-[1.35rem]'>
          勾勾的音乐组件
        </a>
        <button
          className='absolute right-20px'
          onClick={() => console.log('todo')}>
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
                key={item.title}>
                {item.title}
              </NavButton>
            ))}
          </nav>
          <div flex='1 ~ col' text='gray-300' overflow='auto'>
            {navList[currentIndex].element}
          </div>
        </div>
        <aside w='300px'></aside>
      </div>
      {/* 控制栏 */}
      <footer
        w='full'
        h='80px'
        px='200px'
        flex='~'
        justify='center'
        items='center'>
        <Slider
          direction='row'
          value={currentTime / duration}
          initialValue={0}
        />
      </footer>
    </DivWrapper>
  )
})

export default Page
