import { getElementLeft, getElementTop } from '@/utils/getOffset'
//返回获取偏移量的函数
export default function useGetOffset(lineRef: React.RefObject<HTMLDivElement>) {
  /**
   * 返回鼠标在进度条上的左侧或垂直方向的偏移量百分比
   * @param e
   * @returns 百分比
   */
  const getOffset = (e: MouseEvent, direction: 'col' | 'row'): number => {
    // 鼠标点击时距离屏幕左侧的偏移量
    const clickOffset = direction === 'row' ? e.clientX : e.clientY

    // 进度条长度
    const allLength =
      direction === 'row'
        ? lineRef.current?.clientWidth ?? 0
        : lineRef.current?.clientHeight ?? 0

    // 进度条距离屏幕左侧的偏移量
    let parentOffset = 0
    
    if (lineRef.current) {
      // 父亲结点（此时是最外层结点）的
      parentOffset =
        direction === 'row'
          ? getElementLeft(lineRef.current)
          : getElementTop(lineRef.current)
    }

    let offset = clickOffset - parentOffset

    if (offset < 0) {
      offset = 0
    }

    if (offset > allLength) {
      offset = allLength
    }

    // 点击改变进度条的时候也要设置current百分比
    let current = allLength === 0 ? 0 : offset / allLength

    // 如果是竖着的Slider，那么百分比需要1-current，如果不知道为啥，可以将下面这行代码注释掉后看看效果qwq
    current = direction === 'col' ? 1 - current : current
    return current
  }
  return getOffset
}
