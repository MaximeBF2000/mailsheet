import { useState } from 'react'

export const useRequest = (resetTimeout = 1000) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  async function request(url, options) {
    setLoading(true)
    try {
      const response = await fetch(url, options)
      const result = await response.json()
      setError(null)
      setData(result)
      setLoading(false)
      setSuccess(true)
    } catch (err) {
      setData([])
      setError(err)
      setLoading(false)
      setSuccess(false)
    }

    setTimeout(() => {
      setLoading(false)
      setError(null)
      setSuccess(false)
    }, resetTimeout)
  }

  return { data, loading, error, success, request }
}
