import React, { memo, useState } from 'react'

const Search = memo(() => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <div w='full' h='full'>
      <div
        className={
          isFocus
            ? 'border-1px border-solid border-[$active-color]'
            : 'border-1px border-solid border-[$deactive-color]'
        }
        w='full'
        p='x-15px'
        flex='~'
        items='center'
      >
        <input
          flex='1'
          type='text'
          h='40px'
          border='none'
          bg='transparent'
          outline='none'
          text='16px'
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </div>
    </div>
  )
})

export default Search
