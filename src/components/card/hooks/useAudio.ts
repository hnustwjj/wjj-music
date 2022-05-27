import { useAppDispatch } from './../../../store/index'
import { changeCurrentMusic, fetchLyric } from '@/store/music'
import { useState, useRef, SyntheticEvent, useEffect } from 'react'

export const INITIAL_VOLUME = 0.66
export default function useDuration(
  musicList: any[],
  currentMusic: any
) {
  const dispatch = useAppDispatch()
  // 当前歌曲的时常（毫秒）
  const [duration, setDuration] = useState(0)
  //是否正在播放歌曲
  const [isPlaying, setIsPlaying] = useState(false)
  // 播放
  const audioRef = useRef<HTMLAudioElement>(null)

  //音量
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
  /**
   *  切换歌曲
   * @param type 切换到前一首还是后一首
   */
  const switchMusic = async (type: 'pre' | 'next') => {
    let currentIndex = currentMusic.index
    currentIndex += type === 'pre' ? -1 : 1
    if (currentIndex < 0) currentIndex = musicList.length - 1
    if (currentIndex === musicList.length) currentIndex = 0
    const Music = musicList[currentIndex]
    dispatch(changeCurrentMusic(Music))
    dispatch(fetchLyric(Music.id))
    // 根据当前状态判断是否要播放
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
  }

  /**
   * 音乐可播放的回调函数
   * @param e
   */
  const canplay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    // 修改duration
    setDuration((e.target as HTMLAudioElement).duration * 1000)
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
  }
  return {
    switchMusicStaus,
    isPlaying,
    setIsPlaying,
    duration,
    audioRef,
    switchMusic,
    canplay,
    setVolume,
    volume
  }
}
