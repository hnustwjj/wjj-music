import React, { memo } from 'react'
import DivWrapper from './style'
//TODO:手机端兼容
// 1：header手机端看不清
const Page = memo(() => {
  const navList = ['正在播放', '推荐', '搜索', '我的歌单', '我听过的']
  return (
    <DivWrapper>
      <div className='bg-page1 absolute' h='full' w='full' />
      <header className='leading-[60px] relative' h='60px' text='center white'>
        <a
          href='https://github.com/hnustwjj/wjj-music'
          className='text-[1.35rem]'>
          勾勾的音乐播放器
        </a>
        <button
          className='absolute right-20px'
          onClick={() => console.log('todo')}>
          登录
        </button>
      </header>
      <div flex='~ 1' m='x-20'>
        <div flex='1'>
          <nav h='60px'>
            {navList.map(title => (
              <button h='60px' key={title} p='y-2 x-4'>
                {title}
              </button>
            ))}
          </nav>
        </div>
        <aside w='300px'></aside>
      </div>
    </DivWrapper>
  )
})

export default Page
