import { search } from '@/service/music'
import React, { memo, useEffect, useState } from 'react'

const Search = memo(() => {
  const [isFocus, setIsFocus] = useState(false)
  // 保存表单数据
  const [value, setValue] = useState('')

  useEffect(() => {
    // 防抖
    const timer = setTimeout(() => {
      search(value).then(res => {
        console.log(res)
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [value])
  return (
    <div w='full' h='full'>
      <div
        className={
          !isFocus ? 'border-$deactive-color' : 'border-$active-color'
        }
        border='1px solid'
        w='full'
        p='x-15px'
        flex='~'
        items='center'
      >
        <input
          className='placeholder-$low-font'
          flex='1'
          type='text'
          h='40px'
          border='none'
          bg='transparent'
          outline='none'
          text='16px $font'
          placeholder='搜出你想要的世界'
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </div>
  )
})

export default Search
