import { request_util } from '..'
//根据用户uid获取用户歌单
export function getPlayList(uid: number) {
  return request_util.get({
    url: '/user/playlist',
    params: { uid },
  })
}
export function getUserInfo(uid: number) {
  return request_util.get({
    url: '/user/detail',
    params: { uid },
  })
}
