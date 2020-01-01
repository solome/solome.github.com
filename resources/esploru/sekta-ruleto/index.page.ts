import './index.scss'

import Hammer from 'hammerjs'
import { observable } from 'mobx'
import log from '@utils/log'
import mockData from './data/mock'
import { from } from 'rxjs'

const renderItem4Info = (data) => {
  return `
  <img class="sekta-bg" src="${data.img_url}?imageMogr2/thumbnail/196x264/cut/1053x1440/gravity/center" />
  `
}

const renderItem = (data, index) => {
  return `
  <li class="sekta" data-idx="${index}" data-pano_index="${data.pano_index}" style="transform: rotate(${index * 45 + 22.5}deg);">
    ${renderItem4Info(data)}
  </li>
  `
}

function matchRotateDeg (v: string): number {
  const res = /rotate\(([.\-0-9]+)deg\)/.exec(v)
  if (res && res[1]) {
    return Number(res[1])
  }
  return 0
}

interface State {
  curr: number
  hammer: Hammer
  partitions: any[]
}

const render = (selector, partitions: any[]) => {
  const itemsContent = partitions
    .slice(0, 4)
    .concat(partitions.slice(partitions.length - 4))
    .reduce((accu, cuur, index) => accu + renderItem(cuur, index), '')

  const content = `<ul class="sekta-wrapper">${itemsContent}</ul>`
  const nd: HTMLElement = document.querySelector(selector)
  nd.innerHTML = content

  const state = {
    curr: 0,        // 当前分间
    fresh: null,
    hammer: null,
    partitions,
  }

  Promise.resolve().then(() => {
    state.hammer = new Hammer(document.querySelector('.sekta-wrapper'), { swipe: { enable: true } })
    state.hammer.on('swipe', (e) => {
      e.preventDefault()
      const rotateDeg = (() => {
        if (e.direction === Hammer.DIRECTION_LEFT) {
          state.curr += 1
          if (state.curr >= 8) {
            state.curr = state.curr - 8
          }
          return -45 * 1
        }
        if (e.direction === Hammer.DIRECTION_RIGHT) {
          state.curr -= 1
          if (state.curr < 0) {
            state.curr = state.curr + 8
          }
          return 45 * 1
        }
        return 0
      })()

      const nextRotate = (o, l) => {
        const rotate = o + l
        return rotate
      }
      const ndSektaList: NodeListOf<HTMLElement> = document.querySelectorAll('.sekta')
      ndSektaList.forEach((item: HTMLElement) => {
        const oldRotate = matchRotateDeg(item.style.transform)
        const rotate = nextRotate(oldRotate, rotateDeg)
        item.style.transform = 'rotate(' + rotate + 'deg)'
      })

      Promise.resolve().then(() => {
        state.curr = state.curr % (state.partitions.length - 1)

        const currPos = (() => {
          const res = state.curr % 8
          return res < 0 ? res + 8 : res
        })()

        const left = (() => {
          const res = {
            dataIdx: null,
            partitionIdx: null,
          }
          res.dataIdx = currPos - 3
          if (res.dataIdx < 0) {
            res.dataIdx = res.dataIdx + 8
          }
          res.partitionIdx = state.curr - 3
          if (res.partitionIdx < 0) {
            res.partitionIdx = res.partitionIdx + state.partitions.length
          }
          return res
        })()
        const ndLeft: HTMLElement = document.querySelector(`[data-idx="${left.dataIdx}"]`)
        if (ndLeft.dataset.pano_index !== state.partitions[left.partitionIdx].pano_index) {
          ndLeft.innerHTML = renderItem4Info(state.partitions[left.partitionIdx])
          ndLeft.dataset.pano_index = state.partitions[left.partitionIdx].pano_index
        }

        const right = (() => {
          const res = {
            dataIdx: null,
            partitionIdx: null,
          }
          res.dataIdx = currPos + 3
          if (res.dataIdx >= 8) {
            res.dataIdx = res.dataIdx - 8
          }
          res.partitionIdx = state.curr + 3
          console.log('res', state.curr, res.partitionIdx, state.partitions.length)
          if (res.partitionIdx >= state.partitions.length) {
            res.partitionIdx = res.partitionIdx - state.partitions.length
          }
          return res
        })()
        const ndRight: HTMLElement = document.querySelector(`[data-idx="${right.dataIdx}"]`)
        if (ndRight.dataset.pano_index !== state.partitions[right.partitionIdx].pano_index) {
          ndRight.innerHTML = renderItem4Info(state.partitions[right.partitionIdx])
          ndRight.dataset.pano_index = state.partitions[right.partitionIdx].pano_index
        }
      })
    })
  })
}

render('#app', mockData)

// const ndSektas: NodeListOf<HTMLElement> = document.querySelectorAll('.sekta')

// const sektaWrapperHammer = new Hammer(document.querySelector('.sekta-wrapper'), {
//   pinch: { enable: true },
//   rotate: { enable: true },
//   swipe: { enable: true },
// })



// const state = {
//   curr: 22.5,
//   prev: 22.5,
// }
// sektaWrapperHammer.on('swipe', (e) => {
//   e.preventDefault()
//   const leftOrRight = (() => {
//     if (e.direction === Hammer.DIRECTION_LEFT) {
//       return -45 * 1
//     }
//     if (e.direction === Hammer.DIRECTION_RIGHT) {
//       return 45 * 1
//     }
//     return 0
//   })()

//   const newRotate = (o, l) => {
//     const rotate = o + l
//     if (rotate <= -360) {
//       return rotate + 360
//     }
//     if (rotate >= 360) {
//       return rotate - 360
//     }
//     return rotate
//   }
//   ndSektas.forEach((nd) => {
//     const oldRotate = matchRotateDeg(nd.style.transform)
//     const rotate = newRotate(oldRotate, leftOrRight)
//     console.log(state.curr, rotate)
//     const scale = (state.curr - 135 <= rotate && rotate <= state.curr + 135) ? '' : ' scale(0)'
//     nd.style.transform = 'rotate(' + rotate + 'deg)' + scale
//   })

// })

// sektaWrapperHammer.on('rotate', (e) => {
//   log('rotate')
// })
