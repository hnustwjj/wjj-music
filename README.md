# wjj-player
一个react+vite+ts环境下的小音乐，使用方式如下

- 安装
```js
npm i wjj-player
```

- 在入口文件中引入css

```js
import 'wjj-player/dist/style.css'
```

- 任意一个组件中，导入`Card`并使用

```tsx
import React from 'react'
import { Card } from 'wjj-player'
function App() {
  return (
    <div className='App'>
      <Card />
    </div>
  )
}

export default App
```

- 功能

目前支持切换音乐，音量控制，播放进度控制等，后续会继续对这个插件进行拓展，也会考虑开发vue的版本

tips：最近网易云云月接口增加了验证，使用起来可能有问题，如果解决了会将这行删掉~