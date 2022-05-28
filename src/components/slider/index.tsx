import React, { memo, useRef, useState, useEffect } from 'react'
import useGetOffset from './hooks/useGetOffset'
import DivWrapper from './style'
/**
 * change:回调函数，在进度条（current百分比）发生改变时会执行
 * value:外部指定的宽度百分比
 */
type SliderProps = {
  direction: 'col' | 'row'
  value: number
  initialValue: number
  change?: (current: number) => void
}
const Slider = memo((props: SliderProps) => {
  const { value, initialValue, direction } = props
  // 当前进度条的百分比
  const [current, setcurrent] = useState(initialValue)
  // 进度条长度
  const [length, setLength] = useState(0)

  // 实际进度条的div
  const lineRef = useRef<HTMLDivElement>(null)

  // current百分比改变时，会自动修改进度条的有效宽度
  useEffect(() => {
    if (lineRef.current) {
      if (current > 1) setcurrent(1)
      setLength(
        current *
          (direction === 'row'
            ? lineRef.current.clientWidth //获取宽度
            : lineRef.current.clientHeight) //获取高度
      )
      // 如果传入了change就执行
      props.change && props.change(current)
    }
  }, [current])

  // value改变时的副作用函数，用于修改宽度
  useEffect(() => {
    if (lineRef.current) {
      if (value !== undefined) {
        setLength(
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
    document.onmousemove = (e: any) => {
      if (status) {
        setcurrent(getOffset(e, direction))
      }
    }
    document.onmouseup = () => {
      status = false
      document.onmousemove = null
    }
  }
  const widthOrHeight =
    direction === 'col'
      ? { height: length }
      : { width: isNaN(length) ? 0 : length }
  return (
    <DivWrapper
      ref={lineRef}
      className={direction}
      onClick={(e: any) => setcurrent(getOffset(e, direction))}>
      <div
        style={widthOrHeight}
        className={
          (direction === 'row'
            ? 'h-5px rounded-l-full'
            : 'w-5px rounded-t-full') + ' bg-blue line'
        }
      />
      <div
        w='16px'
        h='16px'
        rounded='full'
        transition='none'
        flex='~'
        items='center'
        justify='center'
        cursor='pointer'
        className='bg-[#454545] button'
        style={direction === 'row' ? { marginLeft: -8 } : { marginTop: -8 }}
        onMouseDown={() => mouseDown()}
        onClick={e => e.stopPropagation()}>
        <div w='8px' h='8px' rounded='full' bg='white' />
      </div>
    </DivWrapper>
  )
})

export default Slider
