import React, { memo, useContext } from 'react'

import { Wrapper } from './style'
import { LYRICLIST_NULL_TEXT } from '@/constant'
import { RGBContext } from '@/components/Player'
interface lyricBox {
  currentLyricIndex: number
  lyricList: any[]
  lyricBoxRef: any
  leading?: number
}
//TODO:考虑添加一个drag拖拽歌词功能
const LyricBox = memo((props: lyricBox) => {
  //TODO:在未来可能会考虑修改配色，而不是单纯的修改card的遮罩层透明度（主要是我个人CSS变量管理的不好）
  const RGB = useContext(RGBContext)

  // 获取歌词相关信息的hook
  const { currentLyricIndex, lyricList, lyricBoxRef, leading } = props
  //样式类名
  const pClass = (index: number) =>
    (currentLyricIndex === index ? 'active-lyric' : undefined) +
    ' transition'
  //样式对象
  const style = { padding: `${leading ?? 5}px 0` }
  return (
    <Wrapper ref={lyricBoxRef} className='transition'>
      {lyricList.length ? (
        lyricList.map((item, index) => (
          <p
            text='12px center $lyric'
            leading='18px'
            className={pClass(index)}
            style={style}
            key={item.time + item.content}
          >
            {item.content}
          </p>
        ))
      ) : (
        <div text='$font center 15px'>{LYRICLIST_NULL_TEXT}</div>
      )}
    </Wrapper>
  )
})

export default LyricBox
