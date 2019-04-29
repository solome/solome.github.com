import * as THREE from 'three'
import { orbitControls } from '@three/controls/OrbitControls'

const __global__: any = window as any
__global__.THREE = __global__.THREE || THREE

import('./data/lo024DEgzanMj5BE').then(Data_lo024DEgzanMj5BE => {
  const scene: THREE.Scene = new THREE.Scene()
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)

camera.position.set(0, 0, 35)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: document.querySelector('#webgl-canvas')})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const shape: THREE.Shape = new THREE.Shape()
const shapeEWalls: THREE.Shape = new THREE.Shape()

const line2: Function = (d: String, s: THREE.Shape): void => d.replace(/[()]/g, '').split(', ')
  .map((p: String) => p.split(' ').map(n => Number(n)))
  .forEach((p: number[], i: Number) => s[!i ? 'moveTo' : 'lineTo'](p[0], p[1]))

line2(Data_lo024DEgzanMj5BE.exterior, shape)
line2(Data_lo024DEgzanMj5BE.interior, shape)
line2(Data_lo024DEgzanMj5BE.exterior, shapeEWalls)

const extrudeSettings = { steps: 1, depth: 8, bevelEnabled: false }

const geometry:THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
const geometryEFront: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeEWalls, extrudeSettings)
const geometryEBack: THREE.ExtrudeGeometry = geometryEFront.clone()

geometryEBack.faces.forEach((face: THREE.Face3) => {
  const t: number = face.a
  face.a = face.c
  face.c = t
})
const material0: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xc8c8c8, wireframe: false, transparent: true, opacity: 0.7})
const material1: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xc8c8c8, wireframe: false, transparent: true, opacity: 0.2})
const material2: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xc8c8c8, wireframe: false, transparent: true, opacity: 0})

let renderOrder = 99
const meshConfig = (m: THREE.Mesh) => {
  m.renderOrder = renderOrder++
  scene.add(m)
}

const meshEBack: THREE.Mesh = new THREE.Mesh(geometryEBack, [material2, material0])
meshConfig(meshEBack)
const mesh: THREE.Mesh = new THREE.Mesh(geometry, [material0, material2])
meshConfig(mesh)
const meshEFront: THREE.Mesh = new THREE.Mesh(geometryEFront, [material2, material1])
meshConfig(meshEFront)
renderer.render(scene, camera)

const meshEBackS: THREE.Mesh = meshEBack.clone()
meshEBackS.position.x = -20
meshEBackS.position.y = 0
scene.add(meshEBackS)

const meshEFrontS: THREE.Mesh = meshEFront.clone()
meshEFrontS.position.x = -20
meshEFrontS.position.y = 10

scene.add(meshEFrontS)

const meshS: THREE.Mesh = mesh.clone()
meshS.position.y = 10
scene.add(meshS)

const meshDefault = new THREE.Mesh(geometry, [material0, material1])
meshDefault.position.y = -10
scene.add(meshDefault)

orbitControls(camera, document.body, renderer, scene)

})

