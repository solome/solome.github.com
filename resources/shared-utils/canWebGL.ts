const canWebGL = (() => {
  try {
    return !!(
      window.WebGLRenderingContext &&
      (
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      )
    )
  } catch (error) { return false }
})()

export default canWebGL
