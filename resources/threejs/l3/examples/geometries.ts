import PlaneCanvas from '@three/l3/utils/PlaneCanvas'

const run = (canvas) => {

  const planeCanvas = new PlaneCanvas({ canvas })

  return () => planeCanvas.dispose()

}

export default run
