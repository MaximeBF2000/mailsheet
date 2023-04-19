import { useEffect } from 'react'
import { useRequest } from './useRequest.hook'

export const useFetch = (url, options = {}, otherDependencies = []) => {
  const { data, error, loading, request } = useRequest(url, options)

  useEffect(() => {
    request(url, options)
  }, [url, options, ...otherDependencies])

  return { data, loading, error }
}
