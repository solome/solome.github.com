import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper.js'


export function createHatsuneMiku(container: HTMLDivElement) {
  const state = { runing: true }

  const clock = new THREE.Clock()

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 2000)
  camera.position.z = 30

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xfffffe)

  const gridHelper = new THREE.PolarGridHelper(30, 10, 12)
  gridHelper.position.y = -10
  scene.add(gridHelper)

  const ambient = new THREE.AmbientLight(0x666666)
  scene.add(ambient)

  const directionalLight = new THREE.DirectionalLight(0x887766)
  directionalLight.position.set(-1, 1, 1).normalize()
  scene.add(directionalLight)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)

  const effect = new OutlineEffect(renderer)

  const modelFile = '/three/examples/models/mmd/miku/miku_v2.pmd'
  const vmdFiles = ['/three/examples/models/mmd/vmds/wavefile_v2.vmd']

  const helper = new MMDAnimationHelper({ afterglow: 2.0 })

  const loader = new MMDLoader()

  loader.loadWithAnimation(modelFile, vmdFiles, function (mmd) {
    console.log('__debug__005')

    const mesh = mmd.mesh
    mesh.position.y = -10
    scene.add(mesh)

    helper.add(mesh, {
      animation: mmd.animation,
      physics: true
    })

    const ikHelper = helper.objects.get(mesh).ikSolver.createHelper()
    ikHelper.visible = true
    scene.add(ikHelper)
    const physicsHelper = helper.objects.get(mesh).physics.createHelper()
    physicsHelper.visible = false
    scene.add(physicsHelper)

  }, (xhr) => {
    if (!xhr.lengthComputable) {
      return
    }
    // const percentComplete = xhr.loaded / xhr.total * 100
  }, null)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 10
  controls.maxDistance = 100

  const resizeObserver = new ResizeObserver(() => {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    // effect.setSize(window.innerWidth, window.innerHeight)
    effect.setSize(container.clientWidth, container.clientHeight)

  })
  resizeObserver.observe(container)

  const animate = () => {
    if (state.runing) {
      requestAnimationFrame(animate)
      render()
    }
  }

  const render = () => {
    helper.update(clock.getDelta())
    effect.render(scene, camera)
  }

  animate()

  const dispose = () => {
    state.runing = false
    resizeObserver.unobserve(container)
    resizeObserver.disconnect()
  }

  return { dispose }
}