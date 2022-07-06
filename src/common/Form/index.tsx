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
    <div w='full' h='full'>
      {data.map(item => (
        <div key={item} flex='~' justify='center' mb='5px'>
          <div leading='30px' w='1/4' text='center'>
            {item}
          </div>
          <div flex='1' text='black' p='y-5px x-15px' bg='white' rounded='md'>
            <input
              bg='transparent'
              outline='none'
              w='full'
              value={metadata[item] ?? ''}
              onChange={e =>
                setMetadata(pre => ({ ...pre, [item]: e.target.value }))
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
})
export default Form
