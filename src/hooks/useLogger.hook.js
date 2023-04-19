import { useEffect } from 'react'

export const useLogger = objVar => {
  useEffect(() => {
    const [key, value] = Object.entries(objVar)[0]
    console.log({ [key]: value })
  }, [objVar])
}
