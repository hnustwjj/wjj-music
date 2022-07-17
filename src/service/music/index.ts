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

// 搜索音乐
export function search(keywords: string, offset = 0, limit = 30) {
  return request_util.get({
    url: '/search',
    params: {
      keywords,
      limit,
      offset,
    },
  })
}

//根据歌单id获取歌单详情
export function getPlayListDetail(id: number) {
  return request_util.get({
    url: '/playlist/detail',
    params: { id },
  })
}

//根据trackIds获取所有的音乐信息
export function getAllMusic(trackIds: any[]) {
  return request_util.get({
    url: '/song/detail',
    params: { ids: trackIds.map(item => item.id).join(',') },
  })
}
// 根据id获取音乐url
export function getMusicUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

// 热搜列表(简略)
// 说明 : 调用此接口,可获取热门搜索列表
// 接口地址 : /search/hot
// 调用例子 : /search/hot
