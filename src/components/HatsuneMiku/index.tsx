import * as React from 'react'
import { createHatsuneMiku } from './createHatsuneMiku'
import { useWindowDimensions } from '@site/src/shared-utils/useWindowDimensions'

export function HatsuneMiku() {
  const ref = React.useRef<HTMLDivElement>(null)
  // const size = useWindowDimensions()

  React.useEffect(() => {
    if (!ref.current) {
      return
    }
    console.log('__debug__002')

    const intervalID = setInterval(() => {
      if (window['Ammo']) {
        console.log('__debug__003')
        if (intervalID) {
          clearInterval(intervalID)
        }

        window['Ammo']().then(() => {
        console.log('__debug__004')

          createHatsuneMiku(ref.current!)
        })
      }
    }, 100)

    return () => {
      if (intervalID) {
        clearInterval(intervalID)
      }
    }
  }, [])

  console.log('__debug__001')

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        // width: size.width + 'px',
        // height: size.height - 60 + 'px',
      }}
      className="HatsuneMiku"
      ref={ref}
    ></div>
  )
}
