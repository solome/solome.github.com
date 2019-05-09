import * as THREE from 'three'
import { orbitControls } from '@three/controls/OrbitControls'


const run = (canvas) => {

  // Scene, Camera, Render
  const scene: THREE.Scene = new THREE.Scene()

  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 35)

  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas })
  renderer.setClearColor(0xeeeeee)
  renderer.shadowMap.enabled = true

  // Axes
  const axes = new THREE.AxesHelper(20)
  scene.add(axes)

  // Plane
  const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.receiveShadow = true
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

  const vertices = [
    new THREE.Vector3(1, 3, 1),
    new THREE.Vector3(1, 3, -1),
    new THREE.Vector3(1, -1, 1),
    new THREE.Vector3(1, -1, -1),
    new THREE.Vector3(-1, 3, -1),
    new THREE.Vector3(-1, 3, 1),
    new THREE.Vector3(-1, -1, -1),
    new THREE.Vector3(-1, -1, 1),

  ]

  const faces = [
    new THREE.Face3(0, 5, 1)
  ]

  const geometry = new THREE.Geometry()
  geometry.vertices = vertices
  geometry.faces = faces
  geometry.computeFaceNormals()
  geometry.computeVertexNormals()
  // computeCentroids
  geometry.mergeVertices()

  scene.add(new THREE.Mesh(geometry))

  renderer.render(scene, camera)

  // OrbitCOntrols
  const disposeOrbitControls = orbitControls(camera, document.body, renderer, scene)

  return () => {
    disposeOrbitControls()
  }
}

export default run
