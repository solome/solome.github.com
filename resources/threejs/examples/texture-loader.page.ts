import * as THREE from 'three'
import * as jpgConcreteUrl from '@images/concrete.jpg'
import { orbitControls } from '@three/controls/OrbitControls'

const __global__: any = window as any
__global__.THREE = __global__.THREE || THREE

const scene: THREE.Scene = new THREE.Scene()
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(0, 0, 35)
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: document.querySelector('#webgl-canvas') as HTMLCanvasElement})
renderer.setClearColor(0xeeeeee)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const texture = new THREE.TextureLoader().load(jpgConcreteUrl)
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.offset.set(0, 0)
texture.repeat.set(1, 1)

const cubeSize = 3
const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
const cubeMaterial = new THREE.MeshBasicMaterial({ map: texture})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.castShadow = true
cube.name = 'cube-' + scene.children.length

scene.add(cube)

renderer.render(scene, camera)

orbitControls(camera, document.body, renderer, scene)
