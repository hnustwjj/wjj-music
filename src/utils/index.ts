import img from '@/assets/img/bg-page1.jpg'
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export interface lyricItem {
  time: number
  content: string
}

/**
 * 将歌词转化成对象数组的形式
 * @param lyric
 * @returns
 */
export function parseLyric(lyric: string): lyricItem[] {
  const result: lyricItem[] = []
  lyric.split('\n').map(item => {
    const res: any = parseExp.exec(item)
    if (res) {
      const time1 = res[1] * 60 * 1000
      const time2 = res[2] * 1000
      const time3 = res[3].length === 3 ? res[3] * 1 : res[3] * 10
      const time = time1 + time2 + time3
      const content = item.replace(parseExp, '')
      result.push({ time, content })
    }
  })
  return result
}

/**
 * 返回指定大小的图片
 * @param size : 图片大小;
 * @param url 图片url
 * @returns 指定大小的图片的url
 */
export const imgUrl = (size: number, url?: string) =>
  url ? `${url}?param=${size}y${size}` : img

/**
 * 给出毫秒数，返回时间格式: mm:ss
 * @param time
 * @returns
 */
export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60 / 1000)
  let res = ''
  if (minutes < 10) {
    res += '0'
    res += minutes
  } else {
    res += minutes
  }
  res += ':'
  const seconds = Math.floor((time / 1000) % 60)
  if (seconds < 10) {
    res += '0'
    res += seconds
  } else {
    res += seconds
  }
  return res
}
