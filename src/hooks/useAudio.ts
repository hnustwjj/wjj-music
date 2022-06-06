import { useAppDispatch, useAppSelector } from '../store/index'
import { switchCurrentMusic } from '@/store/music'
import { useState, useRef, SyntheticEvent, useEffect } from 'react'
import { Dispatch, SetStateAction, RefObject } from 'react'
export const INITIAL_VOLUME = 0.66

export interface IAudio {
  switchMusicStaus: () => void
  isPlaying: boolean
  duration: number
  audioRef: RefObject<HTMLAudioElement>
  switchMusic: (type: 'pre' | 'next') => Promise<void>
  canplay: (e: SyntheticEvent<HTMLAudioElement, Event>) => void
  setVolume: Dispatch<SetStateAction<number>>
  volume: number
  bufferPercent: number
  changeJingyin: () => void
  audioTimeUpdate: (e: any, fn?: (e) => void) => void
  currentTime: number
  onError: () => void
  onEnd: () => void
}
//TODO:考虑静音是否用muted属性实现
//需要放在最外面，否则每次执行函数都会重新创建变量
let volumeCache = 0
let isJingyin = false
export default function useAudio(): IAudio {
  const dispatch = useAppDispatch()
  const { duration, playingMusicList, currentMusic, currentTime } =
    useAppSelector(state => state.music)

  //是否正在播放歌曲
  const [isPlaying, setIsPlaying] = useState(false)
  //获取audio元素
  const audioRef = useRef<HTMLAudioElement>(null)
  //音量状态
  const [volume, setVolume] = useState(INITIAL_VOLUME)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  /**
   * 暂停或播放
   */
  const switchMusicStaus = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  //TODO: 播放顺序控制
  /**
   *  切换歌曲
   * @param type 切换到前一首还是后一首
   */
  const switchMusic = async (
    type: 'pre' | 'next',
    order: 'cycle' | 'single' | 'random' = 'cycle'
  ) => {
    // 如果有歌曲就执行
    if (playingMusicList.length) {
      let currentIndex = playingMusicList.findIndex(
        item => item === currentMusic
      )
      currentIndex += type === 'pre' ? -1 : 1
      //循环播放
      if (currentIndex < 0) {
        currentIndex = playingMusicList.length - 1
      } else if (currentIndex === playingMusicList.length) {
        currentIndex = 0
      }
      const Music = playingMusicList[currentIndex]
      // 改变当前音乐
      dispatch(switchCurrentMusic(Music))
      // 根据当前状态判断是否要播放
      isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
    }
  }

  /**
   * 音乐可播放的回调函数
   * @param e
   */
  const canplay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
  }

  const changeJingyin = () => {
    // isJingyin和volumnCache放在函数外，防止每次执行函数都重新声明变量
    if (!isJingyin) {
      volumeCache = volume
      setVolume(0)
    } else {
      setVolume(volumeCache)
    }
    isJingyin = !isJingyin
  }
  const [bufferPercent, setBufferPercent] = useState(0)
  /**
   * 音频时间改变时触发的函数
   * @param e 音频事件
   * @param fn 可选的副作用函数（会将e作为参数传入）
   */
  const audioTimeUpdate = (e: any, fn?: (e) => void) => {
    if (audioRef.current) {
      // 获取timeRange
      const timeRanges = audioRef.current.buffered
      // 最后一个timeRange对象
      const last = timeRanges.length - 1
      // 当最后一个timeRange对象存在时，可以获取到当前缓冲区的长度（单位是s）
      if (last >= 0) {
        setBufferPercent((timeRanges.end(last) / duration) * 1000)
      }
    }
    // 会修改全局的currentTime和currentLyricIndex
    fn && fn(e)
  }

  const onError = () => {
    //console.log(1)
    //switchMusic('next')
    //TODO:Error时发出提示，并且不在切换音乐
  }
  const onEnd = () => {
    switchMusic('next')
  }
  return {
    audioTimeUpdate,
    bufferPercent,
    changeJingyin,
    switchMusicStaus,
    isPlaying,
    duration,
    audioRef,
    switchMusic,
    canplay,
    setVolume,
    volume,
    currentTime,
    onError,
    onEnd,
  }
}
