import * as THREE from 'three'

// import { OutlineEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing'

import initCannon, { updatePhysics, cannonDebugRenderer } from './cannon'
import initThree, { camera, scene, renderer } from './three'
import addItems from './addItems'
import datgui, { settings } from './datgui'
import updateDragPosition from './utils/updateDragPosition'

import './index.css'


// const clock = new THREE.Clock()
export const mixers = []

// const composer = new EffectComposer(renderer)
// const effectPass = new EffectPass(camera, new OutlineEffect())
// effectPass.renderToScreen = true
// composer.addPass(new RenderPass(scene, camera))
// composer.addPass(effectPass)

const render = function () {
  renderer.render(scene, camera)
  // composer.render(clock.getDelta())
}
const clock = new THREE.Clock()
const update = function () {
  if (settings.autoRotate) settings.theta += 0.06
  camera.position.x = settings.radius * Math.sin(THREE.Math.degToRad(settings.theta))
  camera.position.y = THREE.Math.degToRad(360 * settings.height)
  camera.position.z = settings.radius * Math.cos(THREE.Math.degToRad(settings.theta))
  camera.lookAt(scene.position)
  updateDragPosition() // keeps the drag position updated even when the camera moves
  
  const delta = clock.getDelta()  
  mixers.forEach((mixer) => mixer.update(delta))

}

initThree()
initCannon()
addItems()
datgui()

renderer.setAnimationLoop(function () {
  updatePhysics()
  update()
  render()
  
  // cannonDebugRenderer.update()
})
