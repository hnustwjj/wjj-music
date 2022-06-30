import React from 'react'
import ReactDOM from 'react-dom/client'
import Player from './components/Player'
import 'virtual:windi.css'
import '@/assets/css/base.css'
ReactDOM.createRoot(document.getElementById('root')!).render(<Player />)
// build的时候注释上面1、2、3、6行的代码

export { default as Player } from './components/Player'
