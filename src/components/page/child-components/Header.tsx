import { useAppDispatch, useAppSelector } from '@/store'
import { getUserInfoAction } from '@/store/user'
import React, { memo, useEffect } from 'react'
import { alert, confirm } from '@/common/modal'
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
      w='100vw'
      text='center white'
    >
      <a
        href='https://github.com/hnustwjj/wjj-music'
        className='text-[1.35rem]'
      >
        勾勾的音乐组件
      </a>
      <div
        absolute='~'
        right='20px'
        top='1/2'
        transform='~'
        className='translate-y-[-50%]'
      >
        {userInfo.avatarUrl ? (
          <img
            w='35px'
            rounded='full'
            cursor='pointer'
            src={userInfo.avatarUrl}
            alt={userInfo.nickname}
            onClick={() =>
              confirm({
                children: <div>您确定要退出嘛~</div>,
                title: '提示',
              })
            }
          />
        ) : (
          <button
            onClick={() =>
              alert(['test', 'test2'], {
                title: '提示',
              })
            }
          >
            登录
          </button>
        )}
      </div>
    </header>
  )
})

export default Header
