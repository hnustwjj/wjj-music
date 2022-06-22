export interface PlayingListItem {
  name?: string //歌单名
  id?: number
  coverImgUrl?: string //封面
  description?: string //介绍
  trackCount?: number //歌曲数目
  createTime?: number //创建时间
  playCount?: number //播放次数
  creator?: {
    avatarUrl?: string //头像
    nickname?: string //昵称
  }
  tags?: string[]
}

export interface UserInfo {
  nickname?: string //昵称
  avatarUrl?: string //头像
  signature?: string //签名
}
