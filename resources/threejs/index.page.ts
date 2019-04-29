import * as THREE from 'three'
import { orbitControls } from './controls/OrbitControls'
import * as dat from 'dat.gui'

const __global__: any = window as any
__global__.THREE = __global__.THREE || THREE

const scene: THREE.Scene = new THREE.Scene()
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)

camera.position.set(0, 0, 35)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: document.querySelector('#webgl-canvas')})
renderer.setClearColor(0xeeeeee)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMapEnabled = true
document.body.appendChild(renderer.domElement)

// Axes
const axes = new THREE.AxesHelper(20)
scene.add(axes)

// Plane
const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1)
const planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -.5*Math.PI
plane.position.x = 15
plane.position.y = plane.position.z = 0
plane.receiveShadow = true
scene.add(plane)

// Cube/Box
const boxGeometry = new THREE.BoxGeometry(4, 4, 4)
// const boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: true})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.x = -4
box.position.y = 3
box.position.z = 0
box.castShadow = true
scene.add(box)

// Sphere
const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
// const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true})
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff, wireframe: true})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.x = 20
sphere.position.y = 4
sphere.position.z = 2
sphere.castShadow = true
scene.add(sphere)

// SpotLight
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-40, 60, -10)
spotLight.castShadow = true
scene.add(spotLight)

camera.position.x = -30
camera.position.y = 40
camera.position.z = 30
camera.lookAt(scene.position)
interface Controls {
  rotationSpeed: number
  bouncingSpeed: number
}
const controls: Controls = { rotationSpeed: 0.02, bouncingSpeed: 0.04 }
const datGUI = new dat.GUI()

datGUI.add(controls, 'rotationSpeed', 0, 0.5)
datGUI.add(controls, 'bouncingSpeed', 0, 0.5)

let bouncingSpeed = 0

const renderScene = () => {
  box.rotation.x += controls.rotationSpeed
  box.rotation.y += controls.rotationSpeed
  box.rotation.z += controls.rotationSpeed

  bouncingSpeed += controls.bouncingSpeed
  sphere.position.x = 20 + (10*(Math.cos(bouncingSpeed)))
  sphere.position.y = 2 + (10*Math.abs(Math.sin(bouncingSpeed)))

  requestAnimationFrame(renderScene)
  renderer.render(scene, camera)
}

renderScene()
orbitControls(camera, document.body, renderer, scene)
