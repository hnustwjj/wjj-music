/**
 * 获取元素在页面的垂直位置
 * @param element
 * @returns
 */
function getElementTop(element: any) {
  let actualTop = element.offsetTop //这是获取元素距父元素顶部的距离
  let current = element.offsetParent //这是获取父元素
  while (current !== null) {
    //当它上面有元素时就继续执行
    actualTop += current.offsetTop //这是获取父元素距它的父元素顶部的距离累加起来
    current = current.offsetParent //继续找父元素
  }
  return actualTop
}
/**
 * 获取元素在页面的垂直位置
 * @param element
 * @returns
 */
function getElementLeft(element: any) {
  let actualLeft = element.offsetLeft //这是获取元素距父元素顶部的距离
  let current = element.offsetParent //这是获取父元素
  while (current !== null) {
    //当它上面有元素时就继续执行
    actualLeft += current.offsetLeft //这是获取父元素距它的父元素顶部的距离累加起来
    current = current.offsetParent //继续找父元素
  }
  return actualLeft
}

export default function useGetOffset(
  lineRef: React.RefObject<HTMLDivElement>,
) {
  /**
   * 返回鼠标在进度条上的左侧偏移量百分比
   * @param e
   * @returns 百分比
   */
  const getOffset = (
    e: MouseEvent,
    direction: 'col' | 'row'
  ): number => {
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
