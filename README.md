# wjj-player
一个react+vite+ts环境下的小音乐

## 总览

刚进入页面时是一个小的音乐唱片在左下角，如下所示

![image-20220608215051618](https://img.jzsp66.xyz/github/1.png)

点击唱片之后可以显示音乐卡片，音乐卡片是有切换音乐、控制音量，拖拽进度条以及暂停等基本功能的。

![](https://img.jzsp66.xyz/github/2.png)

点击卡片右上角的更多按钮之后，可以进入主页面，有搜索歌曲功能和每日推荐的板块。更多内容正在加紧开发中...

![](https://img.jzsp66.xyz/github/3.png)


# 使用方法
- 安装
```js
npm i wjj-player
```

- 在入口文件中引入css

```js
import 'wjj-player/dist/style.css'
```

- 任意一个组件中，导入`Player`并使用

```tsx
import React from 'react'
import { Player } from 'wjj-player'
function App() {
  return (
    <div className='App'>
      <Player />
    </div>
  )
}

export default App
```

- 功能

目前支持切换音乐，音量控制，播放进度控制等，后续会继续对这个插件进行拓展，也会考虑开发vue的版本

~~tips：最近网易云云月接口增加了验证，使用起来可能有问题，如果解决了会将这行删掉~~

# 项目亮点

1、封装了滚动歌词的组件`lyricBox`

2、封装了滚动条组件`Slider`

3、抽离公共代码到`自定义hooks`中

4、统一封装了`axios`

5、使用`vite打包`成库，即插即用

6、使用canvas获取背景图的平均RGB值，动态修改颜色


# 待完成

1、代码优化

2、手机端适配

3、登录和查询我的歌单