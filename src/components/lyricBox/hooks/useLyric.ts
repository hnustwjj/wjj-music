import { parseLyric } from '@/utils'
import { useAppSelector } from './../../../store/index'
import { useState, useEffect, useRef } from 'react'
export default function useLyric() {
  // 获取当前歌曲和当前歌词
  const { currentLyric, currentMusic } = useAppSelector(
    state => state.music
  )
  // 转换歌词
  const lyricList = parseLyric(currentLyric)
  // 当前歌词下标
  const [currentLyricIndex, setcurrentLyricIndex] = useState(0)

  const [currentTime, setCurrentTime] = useState(0)
  /**
   * 更新播放时间和当前歌词下标的函数（会被audio的onUpdateTime调用）
   * 有时候直接点击进度条跳转会匹配不到导致index为-1，所以传入第二个参数
   * 为了模糊匹配（可以缓解这个情况）
   * @param e
   */
  const updateTime = (e: any, fuzzy = false) => {
    setCurrentTime(
      typeof e !== 'string'
        ? parseInt((e.target.currentTime * 1000).toFixed())
        : parseInt(e)
    )
    const index = lyricList.findIndex(item => {
      return Math.abs(item.time - currentTime) <= (fuzzy ? 1000 : 400)
    })
    if (index !== -1) {
      setcurrentLyricIndex(index)
    }
  }

  // 获取包裹歌词的盒子
  const lyricBox = useRef<HTMLDivElement>(null)

  /**
   * 滚动歌词的副作用函数
   */
  useEffect(() => {
    if (lyricBox.current) {
      // 获取子元素中当前
      //TODO: (不知道为啥currentWrapper可能是undefined，所以下面进行了??判断)
      const currentLyricWrapper = lyricBox.current.children[
        currentLyricIndex
      ] as HTMLElement

      // 当前歌词偏移到盒子中心的偏移量 = 举例父亲顶部的距离 - 父亲高度的一半(固定的70px) + 自身高度的一半
      const offsetTop =
        (currentLyricWrapper?.offsetTop ?? 0) -
        70 +
        (currentLyricWrapper?.clientHeight ?? 18) / 2
      lyricBox.current.style.transform = `translateY(${-offsetTop}px)`
    }
    // 在当前歌词Index改变，或者是歌曲改变时执行
  }, [currentLyricIndex, currentMusic])
  return {
    updateTime,
    currentLyricIndex,
    lyricList,
    lyricBox
  }
}
