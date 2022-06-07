import { getElementLeft, getElementTop } from '@/utils/getOffset'
import { useRef, useState } from 'react'
// 传入img对象，和canvas对象
export default function useCanvas() {
  const ImgRef = useRef<HTMLImageElement>(null)
  const CanvasRef = useRef<HTMLCanvasElement>(null)
  const img = ImgRef.current
  const canvas = CanvasRef.current
  //RGB平均值
  const [RGB, setRGB] = useState({ R: 0, G: 0, B: 0 })
  if (img && canvas) {
    img.crossOrigin = 'anonymous'
    const ctx = canvas.getContext('2d')
    const area = canvas.width * canvas.height
    img.onload = function () {
      let r = 0
      let g = 0
      let b = 0
      ctx!.drawImage(img, 0, 0)
      // 获取canvas元素的水平垂直距离
      const left = getElementLeft(canvas)
      const top = getElementTop(canvas)
      // canvas左上角的坐标
      const leftTop = {
        x: left,
        y: top,
      }
      // canvas右下角的坐标
      const rightBottom = {
        x: left + canvas.width,
        y: top + canvas.height,
      }
      // 遍历计算平均值
      for (let i = leftTop.x; i <= rightBottom.x; i++) {
        for (let j = leftTop.y; j <= rightBottom.y; j++) {
          const pixel = ctx!.getImageData(i, j, 1, 1)
          const data = pixel.data
          r += data[0]
          g += data[1]
          b += data[2]
        }
      }
      setRGB({ R: r / area, G: g / area, B: b / area })
    }
  }
  return { ImgRef, CanvasRef, RGB }
}
