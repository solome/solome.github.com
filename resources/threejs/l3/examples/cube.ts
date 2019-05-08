import * as THREE from 'three'
import * as dat from 'dat.gui'

import { orbitControls } from '@three/controls/OrbitControls'
import __global__ from '@three/libs/__global__'

const run = (canvas) => {

  // Scene, Camera, Render
  const scene: THREE.Scene = new THREE.Scene()
  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 35)
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas })
  renderer.setClearColor(0xeeeeee)
  renderer.shadowMap.enabled = true

  // Plane
  const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
  const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.receiveShadow  = true
  plane.rotation.x = -0.5 * Math.PI
  plane.position.x = 0
  plane.position.y = 0
  plane.position.z = 0
  scene.add(plane)

  // Light
  const ambientLight = new THREE.AmbientLight(0x0c0c0c)
  scene.add(ambientLight)
  const spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(-40, 60, -10)
  spotLight.castShadow = true
  scene.add(spotLight)

  // Fog
  scene.fog = new THREE.FogExp2(0xffffff, 0.015)

  const addCube = () => {
    const cubeSize = Math.ceil((Math.random() * 3))
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.name = 'cube-' + scene.children.length

    cube.position.x = -30 + Math.round((Math.random() * 60 /*planeGeometry.width */))
    cube.position.y = Math.round((Math.random() * 5))
    cube.position.z = -20 + Math.round((Math.random() * 40))
    scene.add(cube)
  }

  const removeCube = () => {
    const allChildren = scene.children
    const lastObject = allChildren[allChildren.length-1]
    if (lastObject instanceof THREE.Mesh) {
      scene.remove(lastObject)
    }
  }

  renderer.render(scene, camera)

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
    overrideMaterial: () => scene.overrideMaterial = !scene.overrideMaterial ? new THREE.MeshLambertMaterial({color: 0xffffff}) : null,
  }
  const datGUI = new dat.GUI()
  datGUI.add(controls, 'rotationSpeed', 0, 0.5)
  datGUI.add(controls, 'addCube')
  datGUI.add(controls, 'removeCube')
  datGUI.add(controls, 'overrideMaterial')

  // Animation
  const renderScene = () => {
    scene.traverse(e => {
      if (e instanceof THREE.Mesh && e !== plane) {
        e.rotation.x += controls.rotationSpeed
        e.rotation.y += controls.rotationSpeed
        e.rotation.z += controls.rotationSpeed
      }
    })

    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
  }

  renderScene()

  // OrbitCOntrols
  const disposeOrbitControls = orbitControls(camera, document.body, renderer, scene)


  return () => {
    datGUI.destroy()
    disposeOrbitControls()
  }
}

export default run
