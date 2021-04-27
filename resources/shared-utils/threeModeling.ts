import { WebGLRenderer } from 'three'
import canWebGL from './canWebGL'

export function generateRenderer({
  preserveDrawingBuffer = false, //
  backgroundColor = 0x181A1C,
  backgroundAlpha = 1,
  pixelRatio = 1,
  antialias = true,
}) {
  if (!canWebGL) { throw new Error('browser not support webGL.') }

  const renderer = new WebGLRenderer({
    alpha: true,
    antialias, // 抗锯齿
    preserveDrawingBuffer,
  })

  renderer.setPixelRatio(pixelRatio)
  renderer.setClearColor(backgroundColor, backgroundAlpha)
  renderer.autoClear = true

  return renderer
}
