import { useEffect, useState } from 'react'
import Card from './components/card'
import Page from './components/page'

import { Provider } from 'react-redux'
import { fetchHotRecommend } from '@/store/music'
import store, { useAppDispatch } from '@/store'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // 请求热榜推荐歌曲的数据
    dispatch(fetchHotRecommend())
  }, [dispatch])

  // page是否显示
  const [pageActive, setPageActive] = useState(false)
  return (
    <>
      <Card changePageActive={() => setPageActive(!pageActive)} />
      <div
        className={`transition opacity-0` + (pageActive ? ' opacity-100' : '')}>
        <Page />
      </div>
    </>
  )
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
