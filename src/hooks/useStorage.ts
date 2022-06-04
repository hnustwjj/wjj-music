class WjjStorage {
  storage = localStorage
  getItem(key: string, defaultJSON: string) {
    return JSON.parse(this.storage.getItem(key) ?? defaultJSON)
  }
  setItem(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  removeItem(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}
const storage = new WjjStorage()
// 在Player.tsx中，会在每次playingMusicList改变时重新存储
export default function useStorage() {
  return storage
}
