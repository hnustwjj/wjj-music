export interface MusicListItem {
  name?: string
  id?: number
  ar?: {
    id?: number
    name?: string
  }[]
  al?: {
    id: number
    name: string
    picUrl: string
  }
  dt?: number
  lyric?: string
  initFlag?: boolean
}
