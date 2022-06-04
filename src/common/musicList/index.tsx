import React, { memo } from 'react'
import { useAppSelector } from '@/store'

import img from '@/assets/img/playing.gif'
import { formatTime } from '@/utils'
import { MusicListItem } from '@/store/music/types'

//TODO:考虑要不要根据使用到这个组件的地方来决定是否显示每一行前面的播放动画
interface MusicList {
  //TODO:source决定取的是每日推荐的列表还是正在播放的列表（或者后期会添加我听过的列表）
  source: 'dailyMusicList' | 'playingMusicList'
  rowClick?: (item: MusicListItem) => void
  rowDoubleClick?: (item: MusicListItem) => void
}
let timer: any = null
const MusicList = memo((props: MusicList) => {
  const music = useAppSelector(state => state.music)
  const { rowClick, source, rowDoubleClick } = props
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
                onDoubleClick={e => double(item)}
              >
                <span
                  w='80px'
                  flex='~'
                  items='center'
                  justify='center'
                >
                  {currentMusic === item ? (
                    <img src={img} />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className='flex-[4]'>{item.name}</span>
                <span className='flex-1'>
                  {item.ar && item.ar[0].name}
                </span>
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
          啥情况，咋啥都没有！！！
        </div>
      )}
    </>
  )
})

export default MusicList
