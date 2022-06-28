import { parseLyric } from '@/utils'
import { useAppSelector, useAppDispatch } from '../store'
import { useEffect, useRef, useMemo } from 'react'
import { changeCurrentTime, changeCurrentLyricIndex } from '@/store/music'
import { lyricItem } from '@/utils'
import { RefObject } from 'react'
export interface ILyric {
  updateTime: (e: any, fuzzy?: boolean) => void
  currentLyricIndex: number
  lyricList: lyricItem[]
  lyricBoxRef: RefObject<HTMLDivElement>
}
export default function useLyric() {
  const dispatch = useAppDispatch()

  // 获取当前歌曲和当前歌词
  const { currentLyric, currentMusic, currentTime, currentLyricIndex } =
    useAppSelector(state => state.music)
  // 转换歌词
  const lyricList = useMemo(() => parseLyric(currentLyric), [currentLyric])

  /**
   * 更新播放时间和当前歌词下标的函数（会被audio的onUpdateTime调用）
   * 有时候直接点击进度条跳转会匹配不到导致index为-1，所以传入第二个参数
   * 为了模糊匹配（可以缓解这个情况）
   * @param e
   */
  const updateTime = (e: any, fuzzy = false) => {
    //修改全局播放时间
    dispatch(
      changeCurrentTime(
        typeof e !== 'string'
          ? parseInt((e.target.currentTime * 1000).toFixed())
          : parseInt(e)
      )
    )
    const index = lyricList.findIndex(
      item => Math.abs(item.time - currentTime) <= (fuzzy ? 1000 : 400)
    )
    if (index !== -1) {
      //修改当前的歌词下标
      dispatch(changeCurrentLyricIndex(index))
    }
  }

  // 获取包裹歌词的盒子
  const lyricBoxRef = useRef<HTMLDivElement>(null)

  /**
   * 滚动歌词的副作用函数
   */
  useEffect(() => {
    if (lyricBoxRef.current) {
      // 获取子元素中当前
      const currentLyricWrapper = lyricBoxRef.current.children[
        currentLyricIndex
      ] as HTMLElement
      if (currentLyricWrapper) {
        // 当前歌词偏移到盒子中心的偏移量 = 距离父亲顶部的距离 - 歌词容器高度的一半(card的歌词容器高度是140px) + 自身高度的一半
        const offsetTop =
          currentLyricWrapper.offsetTop -
          (currentLyricWrapper.parentElement?.parentElement?.clientHeight ??
            140) /
            2 +
          currentLyricWrapper?.clientHeight / 2
        lyricBoxRef.current.style.transform = `translateY(${-offsetTop}px)`
      }
    }
    // 在当前歌词Index改变，或者是歌曲改变时执行
  }, [currentLyricIndex, currentMusic])
  return {
    updateTime,
    currentLyricIndex,
    lyricList,
    lyricBoxRef,
  }
}
