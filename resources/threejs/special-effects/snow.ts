import * as THREE from 'three'

const randomRange = (min, max) => ((Math.random() * (max - min)) + min)

export default function snow () {
  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000)
  camera.position.z = 100
  const scene = new THREE.Scene()
  const textureLoader = new THREE.TextureLoader()
  const map  = textureLoader.load('//vrlab-image4.ljcdn.com/release/web/snow.png')
  const material = new THREE.SpriteMaterial({ map })

  const amount = 360
  const fallSpeen = 2
  const halfX = window.innerWidth / 2
  const halfY = window.innerHeight / 2
  let mouseX = 0
  let mouseY = 0
  const particles = []

  for (let i = 0; i < amount; i++) {
    const particle = new THREE.Sprite(material)
    const randomScale = randomRange(10, 20)
    particle.position.x = randomRange(-1000, 1000)
    particle.position.y = randomRange(-1000, 1000)
    particle.position.z = randomRange(-1000, 1000)
    particle.scale.x = particle.scale.y = particle.scale.z = randomScale
    particle.userData.v = new THREE.Vector3(0, -fallSpeen, 0)
    particle.userData.v.z = (1 * randomRange(-1, 1))
    particle.userData.v.x = (1 * randomRange(-1, 1))
    particles.push(particle)
    scene.add(particle)
  }

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio )
  renderer.setSize(window.innerWidth, window.innerHeight)
  const container = document.createElement('div')
  container.setAttribute('style', 'position: absolute;pointer-events: none;top: 0;left: 0;width: 100%;height: 100%;')
  document.body.appendChild(container)
  container.appendChild(renderer.domElement)

  const mouseHandler = (e) => {
    mouseX = e.clientX - halfX
    mouseY = e.clientY - halfY
  }
  const touchHandler = (e) => {
    e.preventDefault()
    mouseX = e.touches[0].pageX - halfX
    mouseY = e.touches[0].pageY - halfY
  }

  document.addEventListener('mousemove', mouseHandler, false)
  document.addEventListener('touchstart', touchHandler, false)
  document.addEventListener('touchmove', touchHandler, false)

  const render = () => {
    for (const particle of particles) {
      const pp = particle.position
      pp.add(particle.userData.v)
      if (pp.y < -1000) {
        pp.y = 1000
      }
      if (pp.x > 1000) {
        pp.x = -1000
      } else if (pp.x < -1000) {
        pp.x = 1000
      }
      if (pp.z > 1000) {
        pp.z = -1000
      } else if (pp.z < -1000) {
        pp.z = 1000
      }
    }

    camera.position.x += (mouseX - camera.position.x) * 0.0005
    camera.position.y += (-mouseY - camera.position.y) * 0.0005
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
  }

  const animate = () => {
    requestAnimationFrame(animate)
    render()
  }

  animate()
}
