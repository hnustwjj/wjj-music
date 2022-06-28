import React, { memo, useState, PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
//TODO:美化样式'

//create the portal element
const container = document.createElement('div')
container.id = 'dialog-container'
container.className =
  'fixed top-0 left-0 transition bottom-0 right-0 bg-[rgba(0,0,0,.7)]'
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

  const innerContainer = document.createElement('div')
  container.appendChild(innerContainer)
  container.style.zIndex = '99'
  container.style.opacity = '1'

  //回调函数
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
  switchStyle(visible ?? true)
  const onCallback = (type: 'ok' | 'cancel') => {
    type === 'cancel' ? onCancel && onCancel() : onOk && onOk()
    switchStyle(false)
    setTimeout(() => {
      callback && callback()
    }, 300)
  }

  return createPortal(
    <div className='absolute top-[50%] left-[50%] transform  translate-x-[-50%] translate-y-[-50%] bg-[#000] text-[#fff] mx-10px px-10px w-400px '>
      <div className='h-48px leading-[48px] border-b'>{title ?? 'header'}</div>
      <div className='border-b py-10px'>
        {Array.isArray(children) ? children?.map(item => item) : children}
      </div>
      <div className='h-48px leading-[48px]'>
        <button onClick={() => onCallback('cancel')}>close</button>
        <button onClick={() => onCallback('ok')}>confirm</button>
      </div>
    </div>,
    innerContainer
  )
})

export function confirm() {
  const innerContainer = document.createElement('div')
  const root = createRoot(innerContainer)
  root.render(
    <Modal
      title='confirm'
      callback={() => {
        container.removeChild(innerContainer)
      }}
    >
      jzspjzsp
    </Modal>
  )
  container.appendChild(innerContainer)
}
export default Modal
