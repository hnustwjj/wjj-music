const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export interface lyricItem {
  time: number
  content: string
}

export function parseLyric(lyric: string): lyricItem[] {
  const result: lyricItem[] = []
  lyric.split('\n').map((item) => {
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
