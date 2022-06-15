import React, { memo } from 'react'

const Header = memo(() => {
  return (
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
  )
})

export default Header
