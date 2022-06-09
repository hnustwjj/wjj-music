export default function (fn: (...args) => void) {
  console.log(fn.length)
  return function curried(...args1) {
    if (args1.length > fn.length) {
      fn(...args1)
    } else {
      return function (...args2) {
        return curried(...[...args1, ...args2])
      }
    }
  }
}
