import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay|| 500)

    return () => {
      clearTimeout(timer) 
    }
  }, [value, delay])

  return debouncedValue // 返回一个可变的 ref 来保存当前的值
}