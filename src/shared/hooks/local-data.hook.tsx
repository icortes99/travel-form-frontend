import { useEffect, useState } from 'react'

export default function useLocalData<T>(key: string, initialValue: T) {
  const getStoredData = () => {
    const storedData = sessionStorage.getItem(key)
    return storedData ? (JSON.parse(storedData) as T) : initialValue
  }

  const [value, setValue] = useState<T>(getStoredData)

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}