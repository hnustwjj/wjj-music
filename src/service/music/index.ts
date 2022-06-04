import { request_util } from '..'

// 获取我的喜欢音乐的所有id
export function getLike() {
  return request_util.get({
    url: '/recommend/songs',
  })
}

// 根据id获取歌词
export function getLyric(id: number) {
  return request_util.get({
    url: '/lyric',
    params: {
      id,
    },
  })
}
// 根据id获取音乐信息
export function getMusic(ids: number) {
  return request_util.get({
    url: '/song/detail',
    params: {
      ids,
    },
  })
}

// 根据id获取音乐信息
export function search(keywords: string, limit = 30, offset = 0) {
  return request_util.get({
    url: '/search',
    params: {
      keywords,
      limit,
      offset,
    },
  })
}

// 根据id获取音乐url
export function getMusicUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
