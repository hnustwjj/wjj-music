import { forwardRef, useImperativeHandle, useState } from 'react'

const Form = forwardRef(function Form(props: { data: string[] }, ref) {
  const data = props.data
  //FIXME:传入泛型（是否可行，或者根绝data的类型来定义，涉及到类型体操）
  const [metadata, setMetadata] = useState<any>({})
  useImperativeHandle(
    ref,
    () => ({
      metadata,
    }),
    [metadata]
  )
  return (
    <div>
      {data.map(item => (
        <div key={item}>
          <input
            text='black'
            value={metadata[item] ?? ''}
            onChange={e =>
              setMetadata(pre => ({ ...pre, [item]: e.target.value }))
            }
          />
        </div>
      ))}
    </div>
  )
})
export default Form
