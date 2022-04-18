import * as React from 'react'
import { createHatsuneMiku } from './createHatsuneMiku'
import { useWindowDimensions } from '@site/src/shared-utils/useWindowDimensions'

export function HatsuneMiku() {
  const ref = React.useRef<HTMLDivElement>(null)
  const size = useWindowDimensions()

  React.useEffect(() => {
    if (!ref.current) {
      return
    }
    const intervalID = setInterval(() => {
      if (window['Ammo']) {
        console.log('Ammo---', window['Ammo'])

        console.log('intervalID', intervalID)

        if (intervalID) {
          clearInterval(intervalID)
        }

        window['Ammo']().then(() => createHatsuneMiku(ref.current!))
      }
    }, 100)

    return () => {
      if (intervalID) {
        clearInterval(intervalID)
      }
    }
  }, [])

  return (
    <div
      style={{
        width: size.width + 'px',
        height: size.height - 60 + 'px',
      }}
      className="HatsuneMiku"
      ref={ref}
    ></div>
  )
}
