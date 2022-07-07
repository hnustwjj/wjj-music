import type { AppDispatch } from './../store/index'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store'
const useSwrDispatch = (
  actions: (dispatch: AppDispatch) => Promise<any>,
  deps: any[] = []
) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<any>(false)
  const dispatch = useAppDispatch()
  // 分发任务
  useEffect(() => {
    setLoading(true)
    dispatch(actions)
      .then(res => setData(res))
      .finally(() => setTimeout(() => setLoading(false), 500))
  }, [...deps, dispatch])
  //返回状态
  if (!loading) {
    return data
  } else {
    throw Promise.resolve(null)
  }
}
export default useSwrDispatch
