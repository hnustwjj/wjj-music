import Slider from '@/common/slider'
import { useMemo } from 'react'

import type { IAudio } from '@/hooks/useAudio'

/**
 * 用于返回已经实现的时间和音量的Slider
 * @param audioInfo 音频信息
 * @returns
 */
export default function (audioInfo: IAudio) {
  // 音量进度条改变事件
  const onVolumeliderChange = (percent: number) => {
    audioInfo.setVolume(percent)
  }

  const VolumeSlider = useMemo(
    () => (
      <Slider
        direction='col'
        value={audioInfo.volume}
        setValue={percent => onVolumeliderChange(percent)}
      />
    ),
    [onVolumeliderChange]
  )
  return VolumeSlider
}
