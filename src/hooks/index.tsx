import { useState } from 'react'
import { useMount } from 'react-use'

export { useClickAway, useInterval, usePrevious, useMount, useUnmount } from 'react-use'
export { useState, useEffect, useLayoutEffect, useCallback, useContext, useMemo, useReducer, useRef } from 'react'

export { useTimeoutFn } from './useTimeoutFn'
export { useAppDispatch } from './useAppDispatch'
export { useAppSelector } from './useAppSelector'
export { useDebounce } from './useDebounce'
export { useGetDisease } from './useGetDisease'
export { useOnClickOutside } from './useOnClickOutside'

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))
  return mounted
}
