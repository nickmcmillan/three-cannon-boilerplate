import * as THREE from 'three'
import { addGround } from './add/addGround'
import { handleMove, handleDown, handleUp } from './utils/handleInputs'
import handleResize from './utils/handleResize'
import debounce from './utils/debounce'

export const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
})


// renderer.setPixelRatio(window.devicePixelRatio * 0.5)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xefefff) // bg color
// renderer.gammaInput = true
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap // shadowMapType options are BasicShadowMap | PCFShadowMap | PCFSoftShadowMap
renderer.gammaOutput = true
renderer.gammaFactor = 2.2



export const camera = new THREE.PerspectiveCamera(
  45, // FOV – We’re using 45 degrees for our field of view.
  window.innerWidth / window.innerHeight, // Apsect – We’re simply dividing the browser width and height to get an aspect ratio.
  0.5, // Near – This is the distance at which the camera will start rendering scene objects.
  100, // Far – Anything beyond this distance will not be rendered. Perhaps more commonly known as the draw distance.
)
// export const camera = new THREE.OrthographicCamera(window.innerWidth / - 50, window.innerWidth / 50, window.innerHeight / 50, window.innerHeight / - 50, 1, 1000);

export const scene = new THREE.Scene()
export const dragPlane = new THREE.Plane()
export const meshes = [] // Three

const initLights = function () {
  // Lights
  // directional light to cast shadow
  const d = 20
  const lightDir = new THREE.DirectionalLight(0xffffff, 0.7) // color and brightness
  lightDir.position.set(d / 2, d, d / 2) // default is 0, 1, 0 - which is shining directly from top
  lightDir.castShadow = true
  lightDir.shadow.mapSize.width = 1024  // default is 512
  lightDir.shadow.mapSize.height = 1024  // default is 512
  lightDir.shadow.camera.near = 0.5 // default 0.5
  lightDir.shadow.camera.far = 3 * d // default 500
  lightDir.shadow.camera.left = -d
  lightDir.shadow.camera.right = d
  lightDir.shadow.camera.top = d
  lightDir.shadow.camera.bottom = -d
  scene.add(lightDir)

  // ambient light to illuminate the whole scene
  // By far the most common and cheapest way of faking indirect lighting is the AmbientLight, which creates a light that shines equally on all objects but without any direction.
  scene.add(new THREE.AmbientLight(0xaaaaaa, 1))

}

const addEventListeners = function () {
  window.addEventListener('resize', debounce(handleResize, 150), false)
  window.addEventListener('mousedown', handleDown, false)
  window.addEventListener('mousemove', handleMove, false)
  window.addEventListener('mouseup', handleUp, false)
  window.addEventListener('touchstart', handleDown, false)
  window.addEventListener('touchmove', handleMove, { passive: false })
  window.addEventListener('touchend', handleUp, false)
}

export default function () {
  scene.add(camera)
  initLights()
  addGround()
  addEventListeners()
}
