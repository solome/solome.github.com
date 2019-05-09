/**
 * 提供一個平面版的畫布，演示Demo源碼中重複、冗餘邏輯儘量集中在此處。
 */

import * as THREE from 'three'
import * as dat from 'dat.gui'

import { orbitControls } from '@three/controls/OrbitControls'
import __global__ from '@three/libs/__global__'

export interface Options {
  canvas: HTMLCanvasElement
  needAxes?: boolean
  needFog?: boolean
}

export default class PlaneCanvas {
  // 場景
  public scene: THREE.Scene

  // 相機
  public camera: THREE.PerspectiveCamera

  // 渲染器
  public renderer: THREE.WebGLRenderer

  private datGUI: dat.GUI

  private __dispose__: Array<(...args: any[]) => void> = []

  private __requestAnimationFrameId__: number

  constructor ({ canvas, needAxes = false, needFog = false }: Options) {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    this.camera.position.set(0, 0, 35)

    this.renderer = new THREE.WebGLRenderer({ canvas })
    this.renderer.setClearColor(0xeeeeee)
    this.renderer.shadowMap.enabled = true

    // Plane
    const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
      60,
      40,
      1,
      1,
    )
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0
    this.scene.add(plane)

    // Light
    const ambientLight = new THREE.AmbientLight(0x0c0c0c)
    this.scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    this.scene.add(spotLight)

    if (needFog) {
      this.scene.fog = new THREE.FogExp2(0xffffff, 0.015)
    }

    if (needAxes) {
      const axes = new THREE.AxesHelper(20)
      this.scene.add(axes)
    }

    __global__.scene = this.scene
    this.__dispose__.push(
      orbitControls(this.camera, document.body, this.renderer, this.scene),
    )

    this.render()
  }

  /**
   * 渲染
   */
  public render () {
    this.renderer.render(this.scene, this.camera)
  }

  /**
   * 構建 dat.GUI 內容
   * @param container dat.GUI執行容器
   */
  public buildDatGUI (container: (...args: any[]) => any) {
    this.datGUI = new dat.GUI()
    this.__dispose__.push(() => this.datGUI.destroy())

    const dispose = container(this.datGUI)
    if (dispose && dispose instanceof Function) {
      this.__dispose__.push(dispose)
    }
  }

  /**
   * 幀動畫
   * @param frame 當前動畫幀的執行行爲
   */
  public requestAnimationFrame (frame: () => void) {
    const __frame__ = () => {
      frame()
      this.__requestAnimationFrameId__ = requestAnimationFrame(__frame__)
      this.render()
    }

    __frame__()
  }

  /**
   * 銷毀常駐內存的對象、事件綁定
   */
  public dispose () {
    // 如果有幀動畫，則終止幀動畫
    if (this.__requestAnimationFrameId__) {
      cancelAnimationFrame(this.__requestAnimationFrameId__)
    }

    this.__dispose__.forEach((dispose: () => void) => {
      try {
        dispose()
      } catch (err) {
        /* not care */
      }
    })
  }
}
