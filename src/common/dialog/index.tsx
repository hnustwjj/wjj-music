import React, { memo } from 'react'

//TODO:研究Portals API，查看是否可以使用Portals API实现Dialog的弹出
const Dialog = memo((props: any) => {
  return <div>{props.children.map(item => item)}</div>
})

export default Dialog
