const useSwr = (data, fetcher) => {
  let status = 'pending'
  let reason = null
  let value = null
  const promise = fetcher(data)
    .then(res => {
      value = res
      status = 'success'
    })
    .catch(err => {
      reason = err
      status = 'fail'
    })
  if (status === 'pending') throw promise
  else if (status === 'fail') throw reason
  else return value
}

export default useSwr
