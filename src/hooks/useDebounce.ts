import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useDebounce(value: string, delay: number, setIsConsonant: Dispatch<SetStateAction<boolean>>) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      const isConsonant = /[ㄱ-ㅎ]/.test(value)
      setDebouncedValue(value)
      setIsConsonant(isConsonant)
    }, delay)

    return () => {
      clearTimeout(debounceHandler)
    }
  }, [value, delay, debouncedValue, setIsConsonant])
  return debouncedValue
}
