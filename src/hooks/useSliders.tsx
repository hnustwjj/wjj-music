import Slider from '@/common/slider'
import { useMemo } from 'react'
import { INITIAL_VOLUME } from '@/hooks/useAudio'

let preVolume = 0
export default function (audioInfo, lyricInfo) {
  const { audioRef, duration } = audioInfo
  // 时间百分比
  const timePercent =
    ((audioRef.current?.currentTime ?? 0) * 1000) / duration
  // 时间进度条改变事件
  const onTimeSliderChange = (percent: number) => {
    const time = (duration * percent).toFixed()
    lyricInfo.updateTime(time, true)
    if (audioRef.current) {
      audioRef.current.currentTime = parseInt(time) / 1000
    }
  }
  const TimeSlider = useMemo(
    () => (
      <Slider
        direction='row'
        initialValue={0}
        onMouseDown={() => {
          // 在拖动进度条时，音量设置为0
          if (audioRef.current) {
            preVolume = audioRef.current.volume
            audioRef.current.volume = 0
          }
        }}
        onMouseUp={() => {
          // 拖动进度条结束时，恢复音量
          if (audioRef.current) audioRef.current.volume = preVolume
        }}
        change={percent => onTimeSliderChange(percent)}
        value={timePercent}
      />
    ),
    [onTimeSliderChange, timePercent]
  )
  // 音量进度条改变事件
  const onVolumeliderChange = (percent: number) => {
    audioInfo.setVolume(percent)
  }

  const VolumeSlider = useMemo(
    () => (
      <Slider
        direction='col'
        initialValue={INITIAL_VOLUME}
        value={audioInfo.volume}
        change={percent => onVolumeliderChange(percent)}
      />
    ),
    [onTimeSliderChange, timePercent]
  )
  return {
    VolumeSlider,
    TimeSlider,
  }
}
