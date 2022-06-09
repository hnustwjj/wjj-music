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
//根据用户uid获取用户歌单
export function getPlayList(uid: number) {
  return request_util.get({
    url: '/user/playlist',
    params: { uid },
  })
}

// 根据id获取音乐url
export function getMusicUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
// 获取歌单详情
// 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
// 必选参数 : id : 歌单 id
// 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
// 接口地址 : /playlist/detail
// 调用例子 : /playlist/detail?id=24381616

// 热搜列表(简略)
// 说明 : 调用此接口,可获取热门搜索列表
// 接口地址 : /search/hot
// 调用例子 : /search/hot
