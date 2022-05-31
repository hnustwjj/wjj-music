import React, { memo } from 'react'
import { Wrapper } from './style'
interface lyricBox {
  currentLyricIndex: number
  lyricList: any[]
  lyricBoxRef: any
}
const LyricBox = memo((props: lyricBox) => {
  // 获取歌词相关信息的hook
  const { currentLyricIndex, lyricList, lyricBoxRef } = props
  console.log(lyricBoxRef.current)
  return (
    <Wrapper ref={lyricBoxRef}>
      {lyricList.map((item, index) => (
        <p
          text='12px center gray-300'
          leading='23px'
          className={
            currentLyricIndex === index ? 'active-lyric' : ''
          }
          key={item.time + item.content}>
          {item.content}
        </p>
      ))}
    </Wrapper>
  )
})

export default LyricBox
