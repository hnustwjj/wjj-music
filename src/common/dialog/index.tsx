import React, {
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
  PropsWithChildren,
} from 'react'
import { createPortal } from 'react-dom'

//TODO:美化样式
const Dialog = memo(
  forwardRef((props: PropsWithChildren<{ title?: string }>, ref) => {
    const { children, title } = props
    const [show, setShow] = useState(false)
    useImperativeHandle(
      ref,
      () => ({
        changeShow(show) {
          setShow(show)
        },
      }),
      []
    )
    return createPortal(
      <div
        style={{
          opacity: show ? '1' : '0',
          zIndex: show ? '99' : '-1',
        }}
        className='fixed top-0 left-0 transition bottom-0 right-0 bg-[rgba(0,0,0,.7)]'
      >
        <div className='absolute top-[50%] left-[50%] transform  translate-x-[-50%] translate-y-[-50%] bg-[#000] text-[#fff] mx-10px px-10px w-400px '>
          <div className='h-48px leading-[48px] border-b'>
            {title ?? 'header'}
          </div>
          <div className='border-b py-10px'>
            {Array.isArray(children) && children?.map(item => item)}
          </div>
          <div className='h-48px leading-[48px]'>
            <button onClick={() => setShow(false)}>close</button>
            <button onClick={() => setShow(true)}>confirm</button>
          </div>
        </div>
      </div>,
      document.getElementById('root') as HTMLElement
    )
  })
)

export default Dialog
