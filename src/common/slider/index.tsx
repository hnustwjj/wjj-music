import React, { memo, useRef, useState, useEffect } from 'react'
import useGetOffset from './hooks/useGetOffset'
import DivWrapper from './style'
/**
 * setValue:回调函数，在拖动进度条或者点击进度条导致发生改变时会执行
 * bufferValue：可选，传入百分比，设置进度条的缓冲长度
 * value:外部指定的宽度百分比
 */
type SliderProps = {
  direction: 'col' | 'row'
  value: number
  bufferValue?: number
  slot?: string
  setValue: (current: number) => void
  onMouseDown?: () => void
  onMouseUp?: () => void
  onMouseMove?: () => void
}
//TODO:解决拖动时Maximun update的问题
const Slider = memo((props: SliderProps) => {
  // value是传入的进度条百分比
  const { value, direction, setValue, bufferValue, slot } = props
  // value对应的进度条长度
  const [currentLength, setCurrentLength] = useState(0)
  // 实际进度条的div
  const lineRef = useRef<HTMLDivElement>(null)

  // 传入的value改变时，修改进度条宽度的副作用
  useEffect(() => {
    if (lineRef.current) {
      if (value !== undefined) {
        setCurrentLength(
          value *
            (direction === 'row'
              ? lineRef.current.clientWidth //获取宽度
              : lineRef.current.clientHeight) //获取高度
        )
      }
    }
  }, [value])
  // 返回获取偏移量百分比的函数
  const getOffset = useGetOffset(lineRef)

  // 是否松开鼠标
  let status = false
  /**
   * 鼠标按下的回调，添加监听事件，修改进度条长度
   */
  const mouseDown = () => {
    status = true
    if (props.onMouseDown) props.onMouseDown()
    document.onmousemove = (e: any) => {
      if (props.onMouseMove) props.onMouseMove()
      if (status) {
        setValue(getOffset(e, direction))
      }
    }
    document.onmouseup = () => {
      if (props.onMouseUp) props.onMouseUp()
      status = false
      document.onmousemove = null
    }
  }
  const widthOrHeight = (length, isPercent = false) => {
    if (isPercent && lineRef.current) {
      length =
        length *
        (direction === 'row'
          ? lineRef.current.clientWidth //获取宽度
          : lineRef.current.clientHeight) //获取高度
    }
    return direction === 'col'
      ? { height: length }
      : { width: isNaN(length) ? 0 : length }
  }
  return (
    <DivWrapper
      ref={lineRef}
      className={direction}
      onClick={(e: any) => setValue(getOffset(e, direction))}
    >
      {/* 播放进度条 */}
      <div
        style={widthOrHeight(currentLength)}
        className={
          (direction === 'row'
            ? 'h-5px rounded-l-full'
            : 'w-5px rounded-t-full') +
          ' transition bg-$slider-current z-2'
        }
      />
      {/* 加载进度条 */}
      <div
        style={widthOrHeight(bufferValue ?? 0, true)}
        className={
          (direction === 'row'
            ? 'h-5px rounded-full'
            : 'w-5px rounded-full') +
          ' bg-$slider-buffer transition absolute z-1'
        }
      >
        <div
          absolute='~'
          top='0'
          left='0'
          transform='~ -translate-y-full'
          text='$font 13px'
          leading='30px'
          whitespace='nowrap'
        >
          {slot}
        </div>
      </div>
      {/* 圆圈按钮 */}
      <div
        w='16px'
        h='16px'
        rounded='full'
        transition='none'
        flex='~'
        z='3'
        items='center'
        justify='center'
        cursor='pointer'
        className='bg-[#454545] button'
        style={
          direction === 'row' ? { marginLeft: -8 } : { marginTop: -8 }
        }
        onMouseDown={() => mouseDown()}
        onClick={e => e.stopPropagation()}
      >
        <div w='8px' h='8px' rounded='full' bg='white' />
      </div>
    </DivWrapper>
  )
})

export default Slider
