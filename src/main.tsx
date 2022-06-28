import React from 'react'
import ReactDOM from 'react-dom/client'
import Player from './components/Player'
import 'virtual:windi.css'
import '@/assets/css/base.css'
ReactDOM.createRoot(document.getElementById('root')!).render(<Player />)
export { default as Player } from './components/Player'
