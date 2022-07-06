# wjj-player
一个用react+vite+ts+windicss开发的音乐播放器组件，意在让每一个react项目都快速具备音乐播放功能，快来试试吧~

## 总览

刚进入页面时是一个小的音乐唱片在左下角，如下所示

![](https://img.jzsp66.xyz/github/1.png)

点击唱片之后可以显示音乐卡片，音乐卡片是有切换音乐、控制音量，拖拽进度条以及暂停等基本功能的。

![](https://img.jzsp66.xyz/github/2.png)

点击卡片右上角的更多按钮之后，可以进入主页面，有搜索歌曲功能和每日推荐的板块。更多内容正在加紧开发中...

![](https://img.jzsp66.xyz/github/3.png)

也可以选择我的歌单，如下所示

![](https://img.jzsp66.xyz/github/4.png)

同时也进行了一些手机端适配（暂时没想到怎么处理歌词，就把他隐藏啦）

![](https://img.jzsp66.xyz/github/5.png)


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

1、封装了滚动歌词的组件`lyricBox`，会根据当前播放进度，将对应歌词滚动到容器中间

2、封装了滚动条组件`Slider`，支持拖动和点击修改进度

3、使用portal封装了对话框组件`Modal`，同时该组件也支持函数式调用

4、抽离公共代码到`自定义hooks`中

5、使用`vite打包`成库，即插即用

6、使用canvas获取背景图的平均RGB值，动态修改颜色

7、对一些数据进行了持久化处理


# 待完成

1、代码优化

2、手机端适配

3、样式优化

4、suspense

5、登录功能