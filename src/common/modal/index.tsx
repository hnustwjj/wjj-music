import React, { memo, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'

//创建modal要存放的container
const container = document.createElement('div')
container.id = 'dialog-container'
// 样式
container.className =
  'fixed top-0 left-0 transition bottom-0 right-0 bg-[rgba(0,0,0,.5)]'
// 初始化样式
container.style.zIndex = '-1'
container.style.opacity = '0'
document.body.appendChild(container)

interface ModalProps {
  title?: string
  visible?: boolean
  onOk?: () => void
  onCancel?: () => void
  callback?: () => void
}
const Modal = memo((props: PropsWithChildren<ModalProps>) => {
  const { children, title, visible, onCancel, onOk, callback } = props
  // 创建每一个Modal的容器，添加到container中
  const innerContainer = document.createElement('div')
  container.appendChild(innerContainer)
  // 初始化样式
  function switchStyle(show: boolean) {
    if (show) {
      container.style.zIndex = '99'
      container.style.opacity = '1'
    } else {
      container.style.zIndex = '-1'
      container.style.opacity = '0'
      container.innerHTML = ''
    }
  }
  // 初始化
  switchStyle(visible ?? true)
  const onCallback = (type: 'ok' | 'cancel') => {
    type === 'cancel' ? onCancel && onCancel() : onOk && onOk()
    // 点击的时候，container切换为false的样式
    switchStyle(false)
    setTimeout(() => {
      callback && callback()
    }, 300)
  }

  return createPortal(
    <div className='absolute top-[30%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-[rgba(13,17,23)] text-[#fff] w-400px <md:(w-250px) shadow-light rounded-5px'>
      <div className='px-24px py-16px border-b text-16px leading-22px flex justify-between items-center'>
        <div>{(title ?? '标题') + ' : -） '}</div>
        <div className='close' onClick={() => onCallback('cancel')} />
      </div>
      <div className='border-b p-24px text-14px'>
        {Array.isArray(children) ? children?.map(item => item) : children}
      </div>
      <div className='px-16px py-10px flex items-center justify-end text-13px'>
        <button
          className='bg-white text-black py-4px px-15px h-32px rounded-md hover:bg-gray-200'
          onClick={() => onCallback('cancel')}
        >
          取消
        </button>
        <button
          className='bg-white text-black py-4px px-15px h-32px rounded-md hover:bg-gray-200 ml-10px'
          onClick={() => onCallback('ok')}
        >
          确认
        </button>
      </div>
    </div>,
    innerContainer
  )
})

// onOk和onCancel是为了让confirm链式调用的时候有动画
export function confirm(props?: PropsWithChildren<ModalProps>) {
  return new Promise((resolve, reject) => {
    const innerContainer = document.createElement('div')
    const root = createRoot(innerContainer)
    root.render(
      <Modal
        title='confirm'
        callback={() => root.unmount()}
        onOk={() => setTimeout(() => resolve(null), 300)}
        onCancel={() => setTimeout(() => reject(null), 300)}
        {...props}
      />
    )
    container.appendChild(innerContainer)
  })
}

export default Modal
