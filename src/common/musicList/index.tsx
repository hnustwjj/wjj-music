import React, { memo } from 'react'
import { useAppSelector } from '@/store'

import img from '@/assets/img/playing.gif'
import { SingerSpan } from './style'
import { formatTime } from '@/utils'
import { MusicListItem } from '@/store/music/types'
import { LIST_NULL_TEXT } from '@/constant'
interface MusicList {
  source: 'dailyMusicList' | 'playingMusicList'
  rowClick?: (item: MusicListItem) => void
  rowDoubleClick?: (item: MusicListItem) => void
  deleteClick?: (item: MusicListItem) => void
}
let timer: any = null
const MusicList = memo((props: MusicList) => {
  const music = useAppSelector(state => state.music)
  const { rowClick, source, rowDoubleClick, deleteClick } = props
  const { currentMusic } = music
  const dataList = music[source]
  //TODO: 如果后面需要，会抽离到hook中，如果不需要就将这个TODO删掉
  // 单击row触发事件
  const single = (item: MusicListItem) => {
    clearTimeout(timer) // 清除第二次单击事件
    timer = setTimeout(() => {
      rowClick && rowClick(item)
    }, 200)
  }
  // 双击row触发事件
  const double = (item: MusicListItem) => {
    clearTimeout(timer) // 清除第一次单击事件
    rowDoubleClick && rowDoubleClick(item)
  }

  //点击delete按钮触发事件
  const deleteFn = (e: Event, item: MusicListItem) => {
    e.stopPropagation()
    //TODO:删除的提示
    deleteClick && deleteClick(item)
  }
  return (
    <>
      {dataList.length ? (
        <div h='full' w='full'>
          <div
            flex='~'
            text='14px thin'
            border='b-1'
            className='border-[hsla(0,0%,100%,.1)]'
            leading='50px'
          >
            <span w='80px' />
            <span className='flex-[4]'>歌曲</span>
            <span className='flex-1'>歌手</span>
            <span w='80px'>时长</span>
          </div>
          <div flex='1' overflow='auto'>
            {dataList.map((item, index) => (
              <div
                flex='~'
                text='14px thin'
                leading='50px'
                border='b-1'
                cursor='pointer'
                key={item.id}
                className='border-[hsla(0,0%,100%,.1)] hover:bg-[rgba(0,0,0,.05)]'
                onClick={() => single(item)}
                onDoubleClick={() => double(item)}
              >
                {/* 序号 */}
                <span
                  w='80px'
                  flex='~'
                  items='center'
                  justify='center'
                >
                  {currentMusic.id === item.id ? (
                    <img src={img} />
                  ) : (
                    index + 1
                  )}
                </span>
                {/* 歌名 */}
                <SingerSpan>
                  {item.name}
                  {deleteClick !== undefined ? (
                    <span
                      className='delete'
                      onClick={e => deleteFn(e, item)}
                    />
                  ) : null}
                </SingerSpan>
                {/* 歌手 */}
                <span className='flex-1'>
                  {item.ar && item.ar[0].name}
                </span>
                {/* 时常 */}
                <span w='80px'>{formatTime(item.dt ?? 0)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          h='full'
          w='full'
          flex='~'
          justify='center'
          items='center'
        >
          {LIST_NULL_TEXT}
        </div>
      )}
    </>
  )
})

export default MusicList
