import { memo, useEffect, useState } from 'react'
import Card from './components/card'
import Page from './components/page'

import { Provider } from 'react-redux'
import { fetchHotRecommend } from '@/store/music'
import store, { useAppDispatch } from '@/store'
import Slider from './components/slider'

const App = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // 请求热榜推荐歌曲的数据
    dispatch(fetchHotRecommend())
  }, [dispatch])

  // page是否显示
  const [pageActive, setPageActive] = useState(false)

  //TODO:抽离出Slider和audio
  // const timeSlider = <Slider />
  return (
    <>
      <Card changePageActive={() => setPageActive(!pageActive)} />
      <div
        h='100vh'
        w='100vw'
        className={
          `transition-opacity opacity-0` + (pageActive ? ' opacity-100' : '')
        }>
        <Page />
      </div>
    </>
  )
})
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
