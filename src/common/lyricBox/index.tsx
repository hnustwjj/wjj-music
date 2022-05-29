import React, { memo } from 'react'
import { Wrapper } from './style'
interface lyricBox {
  currentLyricIndex: number
  lyricList: any[]
  lyricBox: any
}
const LyricBox = memo((props: lyricBox) => {
  // 获取歌词相关信息的hook
  const { currentLyricIndex, lyricList, lyricBox } = props

  return (
    <Wrapper ref={lyricBox}>
      {lyricList.map((item, index) => (
        <p
          text='12px center gray-300'
          leading='23px'
          className={currentLyricIndex === index ? 'active-lyric' : ''}
          key={item.time + item.content}>
          {item.content}
        </p>
      ))}
    </Wrapper>
  )
})

export default LyricBox
