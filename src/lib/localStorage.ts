import { useState, useEffect, useCallback } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(null)

  useEffect(() => {
    const initialize = (key: string) => {
      try {
        const item = localStorage.getItem(key)
        if (item && item !== 'undefined') {
          return JSON.parse(item)
        }

        localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      } catch {
        return initialValue
      }
    }
    setState(initialize(key))
  }, [initialValue, key])

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value() : value
        setState(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.log(error)
      }
    },
    [key, setState],
  )

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.log(e)
    }
  }, [key])

  return [state, setValue, remove]
}