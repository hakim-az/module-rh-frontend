import { createContext } from 'react'

export interface MediaQueryProps {
  width: number
  height: number
}

export const MediaQueryContext = createContext<MediaQueryProps>({
  width: 0,
  height: 0,
})
