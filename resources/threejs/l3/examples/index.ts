import * as THREE from 'three'
import { orbitControls } from '@three/controls/OrbitControls'
import * as dat from 'dat.gui'
import __global__ from '@three/libs/__global__'

import PlaneCanvas from '@three/l3/utils/PlaneCanvas'

const run = (canvas) => {

  const planeCanvas = new PlaneCanvas({ canvas, needAxes: true })

  const scene = planeCanvas.scene

  // Cube/Box
  const boxGeometry = new THREE.BoxGeometry(4, 4, 4)
  // const boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
  const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: true })
  const box = new THREE.Mesh(boxGeometry, boxMaterial)
  box.position.x = -4
  box.position.y = 3
  box.position.z = 0
  box.castShadow = true
  scene.add(box)

  // Sphere
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
  // const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true})
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff, wireframe: true })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.x = 20
  sphere.position.y = 4
  sphere.position.z = 2
  sphere.castShadow = true
  scene.add(sphere)

  const camera = planeCanvas.camera
  camera.position.x = -30
  camera.position.y = 40
  camera.position.z = 30
  camera.lookAt(scene.position)
  interface Controls {
    rotationSpeed: number
    bouncingSpeed: number
  }
  const controls: Controls = { rotationSpeed: 0.02, bouncingSpeed: 0.04 }

  planeCanvas.buildDatGUI((datGUI) => {

    datGUI.add(controls, 'rotationSpeed', 0, 0.5)
    datGUI.add(controls, 'bouncingSpeed', 0, 0.5)

  })

  let bouncingSpeed = 0
  planeCanvas.requestAnimationFrame(() => {

    box.rotation.x += controls.rotationSpeed
    box.rotation.y += controls.rotationSpeed
    box.rotation.z += controls.rotationSpeed

    bouncingSpeed += controls.bouncingSpeed
    sphere.position.x = 20 + (10 * (Math.cos(bouncingSpeed)))
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(bouncingSpeed)))

  })

  return () => planeCanvas.dispose()

}

export default run
