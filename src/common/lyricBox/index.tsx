import React, { memo } from 'react'
import { Wrapper } from './style'
interface lyricBox {
  currentLyricIndex: number
  lyricList: any[]
  lyricBoxRef: any
  leading?: number
}
const LyricBox = memo((props: lyricBox) => {
  // 获取歌词相关信息的hook
  const { currentLyricIndex, lyricList, lyricBoxRef, leading } = props
  return (
    <Wrapper ref={lyricBoxRef}>
      {lyricList.map((item, index) => (
        <p
          text='12px center gray-300'
          className={
            currentLyricIndex === index ? 'active-lyric' : ''
          }
          style={{
            lineHeight: (leading ?? 23) + 'px',
          }}
          key={item.time + item.content}>
          {item.content}
        </p>
      ))}
    </Wrapper>
  )
})

export default LyricBox
