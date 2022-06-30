export interface IGetCookie {
  // 800过期、801等待扫码、802待确认、803成功
  code: '800' | '801' | '802' | '803'
  // 提示信息
  message: string
  cookie: string

  //下面两个在802时有用
  nickname?: string
  avatarUrl?: string
}
