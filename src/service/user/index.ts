import { FIXME } from './../../vite-env.d'
import { IGetCookie } from './type'
import { request_util } from '..'
//获取唯一key
function getUniqueKey() {
  return request_util.get<{ data: { unikey: string } }>({
    url: '/login/qr/key',
    params: {
      timerstamp: Date.now(),
    },
  })
}
//获取二维码
function getQr(key: string) {
  return request_util.get<{ data: { qrimg: string } }>({
    url: '/login/qr/create',
    params: {
      key,
      qrimg: true,
      timerstamp: Date.now(),
    },
  })
}
//将上面两个api整合后的函数
export const getQrIamge = async () => {
  const {
    data: { unikey },
  } = await getUniqueKey()
  const {
    data: { qrimg },
  } = await getQr(unikey)
  return { qrimg, unikey }
}

//检测二维码状态，如果code是803，则返回cookie
export function getCookie(key: string) {
  return request_util.get<IGetCookie>({
    url: '/login/qr/check',
    params: {
      key,
      timerstamp: Date.now(),
    },
  })
}

//检查登录状态
//TODO:如果过期就clear
export function checkLoginStatus() {
  return request_util.get<FIXME>({
    url: '/login/status',
    params: {
      timerstamp: Date.now(),
    },
  })
}

//登出
export function lotgout() {
  return request_util.get<FIXME>({
    url: '/logout',
  })
}

//根据用户uid获取用户歌单
export function getPlayList(uid: number) {
  return request_util.get({
    url: '/user/playlist',
    params: { uid },
  })
}

//根据用户uid获取用户信息
export function getUserInfo(uid: number) {
  return request_util.get({
    url: '/user/detail',
    params: { uid },
  })
}
