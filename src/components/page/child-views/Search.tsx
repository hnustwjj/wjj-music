import React, { memo, useEffect, useState } from 'react'
import { getMusic, search } from '@/service/music'
import { formatTime } from '@/utils'
import { pushPlayingMusicList } from '@/store/music'
import { useAppDispatch } from '@/store'
import { LIST_NULL_TEXT } from '@/constant'
import useScrollToBottom from '@/hooks/useScrollToBottom'

const LIMIT = 30

const Search = memo(() => {
  const dispatch = useAppDispatch()
  const [isFocus, setIsFocus] = useState(false)
  // 保存表单数据
  const [value, setValue] = useState('')
  const [dataList, setDataList] = useState([] as any[])
  const [songCount, setSongCount] = useState(0)

  useEffect(() => {
    // 防抖，获取搜索结果
    const timer = setTimeout(() => {
      search(value).then(res => {
        setDataList(res?.result?.songs ?? ([] as any[]))
        setSongCount(res?.result?.songCount)
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [value])

  // 点击歌曲，添加到正在播放列表中
  const add = async (item: any) => {
    const res = await getMusic(item.id)
    dispatch(pushPlayingMusicList(res.songs[0]))
  }

  const showMore = async e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight) {
      if (dataList.length < songCount) {
        let offset = ~~(dataList.length / LIMIT)
        let limit = LIMIT
        if ((offset + 1) * LIMIT > songCount) {
          limit = songCount - offset * LIMIT
        }
        const res = await search(value, offset, limit)
        setDataList([...dataList, ...(res?.result?.songs ?? [])])
      }
    } else {
      console.log('还没滚动到底部')
    }
  }

  return (
    <div w='full' h='full' flex='~ col'>
      <div
        className={!isFocus ? 'border-$deactive-color' : 'border-$active-color'}
        border='1px solid'
        w='full'
        p='x-15px'
        flex='~'
        items='center'
      >
        <input
          className='placeholder-$deactive-color'
          flex='1'
          type='text'
          h='40px'
          border='none'
          bg='transparent'
          outline='none'
          text='16px $font'
          placeholder='搜出你想要的世界'
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      {dataList.length ? (
        <div flex='1 ~ col' w='full' overflow='hidden'>
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
          <div flex='1' overflow='auto' onScroll={e => showMore(e)}>
            {dataList.map((item, index) => (
              <div
                flex='~'
                text='14px thin'
                leading='50px'
                border='b-1'
                cursor='pointer'
                key={item.id}
                className='border-[hsla(0,0%,100%,.1)] hover:bg-[rgba(0,0,0,.05)]'
                onClick={() => add(item)}
              >
                {/* 序号 */}
                <span w='80px' flex='~' items='center' justify='center'>
                  {index + 1}
                </span>
                {/* 歌名 */}
                <span className='flex-[4]'>{item.name}</span>
                {/* 歌手 */}
                <span className='flex-1'>
                  {item.artists && item.artists[0].name}
                </span>
                {/* 时常 */}
                <span w='80px'>{formatTime(item.duration ?? 0)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div w='full' flex='~ 1' justify='center' items='center'>
          {LIST_NULL_TEXT}
        </div>
      )}
    </div>
  )
})

export default Search
