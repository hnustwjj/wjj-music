import React, { memo } from 'react'
import { Wrapper } from './style'
interface lyricBox {
  currentLyricIndex: number
  lyricList: any[]
  lyricBoxRef: any
  leading?: number
}
//TODO:考虑添加一个drag拖拽歌词功能
const LyricBox = memo((props: lyricBox) => {
  // 获取歌词相关信息的hook
  const { currentLyricIndex, lyricList, lyricBoxRef, leading } = props
  //样式类名
  const pClass = (index: number) =>
    currentLyricIndex === index ? 'active-lyric' : undefined
  //样式对象
  const style = { padding: `${leading ?? 5}px 0` }
  return (
    <Wrapper ref={lyricBoxRef}>
      {lyricList.map((item, index) => (
        <p
          text='12px center gray-300'
          leading='18px'
          className={pClass(index)}
          style={style}
          key={item.time + item.content}
        >
          {item.content}
        </p>
      ))}
    </Wrapper>
  )
})

export default LyricBox
