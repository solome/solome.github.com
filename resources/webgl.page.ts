// WebGL Demos
function main(): void {
  const canvas: HTMLCanvasElement = document.querySelector('#webgl-canvas')
  const gl: WebGLRenderingContext = canvas.getContext('webgl')

  gl.clearColor(0, 1, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  console.log('gl', gl)
}

document.addEventListener('DOMContentLoaded', main)
