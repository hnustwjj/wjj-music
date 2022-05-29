import React from 'react'
import ReactDOM from 'react-dom/client'
import Player from './Player'
import 'virtual:windi.css'
import '@/assets/css/base.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Player />
)
//TODO:考虑实现一个，根据图像背景的色值动态修改按钮颜色的功能
//TODO:数据持久化（我听过的）

// import 'virtual:windi.css'
// import '@/assets/css/base.css'
// export { default as Player } from './Player'
