export default function (fn: () => void) {
  let timer: any = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    return function () {
      timer = setTimeout(() => {
        fn()
      }, 3000)
    }
  }
}
