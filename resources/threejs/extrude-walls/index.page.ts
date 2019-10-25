import * as THREE from 'three'
import { orbitControls } from '@three/controls/OrbitControls'
import ExtrudeWallsDataModel from './ExtrudeWallsDataModel'

const __global__: any = window as any
__global__.THREE = __global__.THREE || THREE

const run = (Data_lo024DEgzanMj5BE: ExtrudeWallsDataModel) => {
  const scene: THREE.Scene = new THREE.Scene()
  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  )

  camera.position.set(0, 0, 35)

  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#webgl-canvas') as HTMLCanvasElement,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const shape: THREE.Shape = new THREE.Shape()
  const shapeEWalls: THREE.Shape = new THREE.Shape()

  const line2: (d: Array<[number, number]>, s: THREE.Shape) => void = (
    d: Array<[number, number]>,
    s: THREE.Shape,
  ): void =>
    d.forEach((p: number[], i: number) =>
      s[!i ? 'moveTo' : 'lineTo'](p[0], p[1]),
    )

  line2(Data_lo024DEgzanMj5BE.exterior, shape)
  line2(Data_lo024DEgzanMj5BE.interior, shape)
  line2(Data_lo024DEgzanMj5BE.exterior, shapeEWalls)

  const extrudeSettings = {
    bevelEnabled: false,
    depth: Data_lo024DEgzanMj5BE.height,
    steps: 1,
  }

  const geometry: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(
    shape,
    extrudeSettings,
  )
  const geometryEFront: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(
    shapeEWalls,
    extrudeSettings,
  )
  const geometryEBack: THREE.ExtrudeGeometry = geometryEFront.clone()

  geometryEBack.faces.forEach((face: THREE.Face3) => {
    const t: number = face.a
    face.a = face.c
    face.c = t
  })
  const material0: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xc8c8c8,
    opacity: 0.7,
    transparent: true,
    wireframe: false,
  })
  const material1: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xc8c8c8,
    opacity: 0.2,
    transparent: true,
    wireframe: false,
  })
  const material2: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xc8c8c8,
    opacity: 0,
    transparent: true,
    wireframe: false,
  })

  let renderOrder = 99
  const meshConfig = (m: THREE.Mesh) => {
    m.renderOrder = renderOrder++
    scene.add(m)
  }

  const meshEBack: THREE.Mesh = new THREE.Mesh(geometryEBack, [
    material2,
    material0,
  ])
  meshConfig(meshEBack)
  const mesh: THREE.Mesh = new THREE.Mesh(geometry, [material0, material2])
  meshConfig(mesh)
  const meshEFront: THREE.Mesh = new THREE.Mesh(geometryEFront, [
    material2,
    material1,
  ])
  meshConfig(meshEFront)
  renderer.render(scene, camera)

  const meshEBackS: THREE.Mesh = meshEBack.clone()
  meshEBackS.position.x = -16
  meshEBackS.position.y = 16
  scene.add(meshEBackS)

  const meshEFrontS: THREE.Mesh = meshEFront.clone()
  meshEFrontS.position.x = 16
  meshEFrontS.position.y = -16

  scene.add(meshEFrontS)

  const meshS: THREE.Mesh = mesh.clone()
  meshS.position.x = 16
  meshS.position.y = 16
  scene.add(meshS)

  const meshDefault = new THREE.Mesh(geometry, [material0, material1])
  meshDefault.position.x = -16
  meshDefault.position.y = -16
  scene.add(meshDefault)

  orbitControls(camera, document.body, renderer, scene)
}

const lsJson: ExtrudeWallsDataModel = JSON.parse(
  localStorage.getItem('extrude_walls_json'),
) as ExtrudeWallsDataModel

const promise = lsJson
  ? Promise.resolve(lsJson)
  : fetch('/data/lo024DEgzanMj5BE.json') // /data/ZLvK29zj4L29Jowd.json
      .then((res) => res.json())
      .then((json) => json as ExtrudeWallsDataModel)

promise.then(run).catch((error) => console.log(error))
