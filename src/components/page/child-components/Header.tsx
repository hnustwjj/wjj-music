import { useAppDispatch, useAppSelector } from '@/store'
import { getUserInfoAction } from '@/store/user'
import React, { memo, useEffect } from 'react'

const Header = memo(() => {
  const dispatch = useAppDispatch()
  const { uid, userInfo } = useAppSelector(state => state.user)
  useEffect(() => {
    dispatch(getUserInfoAction(uid))
  }, [dispatch])
  return (
    <header
      className='leading-[60px] flex justify-center items-center relative'
      h='60px'
      text='center white'
    >
      <a
        href='https://github.com/hnustwjj/wjj-music'
        className='text-[1.35rem]'
      >
        勾勾的音乐组件
      </a>
      {userInfo.avatarUrl ? (
        <img
          absolute='~'
          right='20px'
          w='50px'
          rounded='full'
          cursor='pointer'
          src={userInfo.avatarUrl}
          alt={userInfo.nickname}
        />
      ) : (
        <button
          absolute='~'
          right='20px'
          onClick={() => alert('todo')}
        >
          登录
        </button>
      )}
    </header>
  )
})

export default Header
