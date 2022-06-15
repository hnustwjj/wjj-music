import React, { memo } from 'react'
import {
  PAGE_SINGER_NULL_TEXT,
  PAGE_SONG_NULL_TEXT,
} from '@/constant'
import { ILyric } from '@/hooks/useLyric'
import LyricBox from '@/common/lyricBox'
import { IMusicInfo } from '@/hooks/useMusic'
const Music = memo(
  (props: { lyricInfo: ILyric; musicInfo: IMusicInfo }) => {
    // 获取音乐信息相关
    const { singers, name: songName } = props.musicInfo
    // 获取歌词相关信息
    const { currentLyricIndex, lyricList, lyricBoxRef } =
      props.lyricInfo
    return (
      <aside
        w='300px'
        flex='~ col'
        items='center'
        className='<lg:(hidden)'
      >
        <div w='250px' flex='~ col' items='center' h='full'>
          {/* 歌名 */}
          <div
            h='60px'
            text='15px center $song'
            flex='~'
            leading='20px'
            overflow='hidden'
            items='center'
            m='b-10px'
          >
            {songName || PAGE_SONG_NULL_TEXT}
          </div>
          {/* 歌手 */}
          <p
            h='40px'
            text='12px center $singer'
            leading='20px'
            m='b-20px'
            w='140px'
          >
            歌手：{singers || PAGE_SINGER_NULL_TEXT}
          </p>
          {/* 歌词 */}
          <div flex='1' overflow='hidden' relative='~' p='x-16px'>
            <LyricBox
              leading={10}
              currentLyricIndex={currentLyricIndex}
              lyricList={lyricList}
              lyricBoxRef={lyricBoxRef}
            />
          </div>
        </div>
      </aside>
    )
  }
)

export default Music
