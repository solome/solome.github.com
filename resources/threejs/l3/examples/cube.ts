/**
 * 好玩的立方體
 */

import * as THREE from 'three'
import * as dat from 'dat.gui'

import __global__ from '@three/libs/__global__'
import PlaneCanvas from '@three/l3/utils/PlaneCanvas'

const run = (canvas) => {
  const planeCanvas = new PlaneCanvas({ canvas, needFog: true })
  const scene = planeCanvas.scene

  const addCube = () => {
    const cubeSize = Math.ceil(Math.random() * 3)
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.name = 'cube-' + scene.children.length

    cube.position.x =
      -30 + Math.round(Math.random() * 60 /*planeGeometry.width */)
    cube.position.y = Math.round(Math.random() * 5)
    cube.position.z = -20 + Math.round(Math.random() * 40)
    scene.add(cube)
  }

  const removeCube = () => {
    const allChildren = scene.children
    const lastObject = allChildren[allChildren.length - 1]
    if (lastObject instanceof THREE.Mesh) {
      scene.remove(lastObject)
    }
  }

  __global__.scene = scene
  __global__.addCube = addCube
  __global__.removeCube = removeCube

  for (let i = 0; i < 20; i++) {
    addCube()
  }

  // dat.gui
  interface Controls {
    rotationSpeed: number
    addCube: Function
    removeCube: Function
    overrideMaterial: Function
  }

  const controls: Controls = {
    rotationSpeed: 0.02,
    addCube,
    removeCube,
    overrideMaterial: () =>
      (scene.overrideMaterial = !scene.overrideMaterial
        ? new THREE.MeshLambertMaterial({ color: 0xffffff })
        : null),
  }

  planeCanvas.buildDatGUI((datGUI: dat.GUI) => {
    datGUI.add(controls, 'rotationSpeed', 0, 0.5)
    datGUI.add(controls, 'addCube')
    datGUI.add(controls, 'removeCube')
    datGUI.add(controls, 'overrideMaterial')
  })

  planeCanvas.requestAnimationFrame(() => {
    scene.traverse((e) => {
      if (e instanceof THREE.Mesh && e.name.startsWith('cube-')) {
        e.rotation.x += controls.rotationSpeed
        e.rotation.y += controls.rotationSpeed
        e.rotation.z += controls.rotationSpeed
      }
    })
  })

  return () => planeCanvas.dispose()
}

export default run
