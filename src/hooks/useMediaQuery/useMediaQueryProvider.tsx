import { useEffect, useMemo, useState, type JSX } from 'react'
import { MediaQueryContext } from './useMediaQuery'

type Props = {
  children: JSX.Element | JSX.Element[]
}

function UseMediaQueryProvider({ children }: Props) {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  // ✅ Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({ width, height }), [width, height])

  return <MediaQueryContext value={value}>{children}</MediaQueryContext>
}

export default UseMediaQueryProvider
