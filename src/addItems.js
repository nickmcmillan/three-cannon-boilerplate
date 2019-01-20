// Adders
import addItem from './add/addItem'
import addModel from './add/addModel'

import texturePng from './textures/uv_test_bw_1024.png'
import pedal from './models/pedal.glb'
// import parrot from './models/parrot.glb'

import vertexShader from './shaders/testVertex'
import fragmentShader from './shaders/testFragment'

export default async function () {

  addItem({
    type: 'box',
    dimensions: { x: 3, y: 1, z: 1 },
    textureSrc: texturePng,
    position: { x: 0, y: 5, z: 0 },
  })
  
  addItem({
    type: 'sphere',
    radius: 3,
    mass: 3,
    color: 'orange',
    textureSrc: texturePng,
    position: { x: 0, y: 2, z: 0 },
  })

  addItem({
    type: 'sphere',
    radius: 2,
    mass: 2,
    position: { x: 5, y: 4, z: 0 },
    vertexShader,
    fragmentShader,
    material: 'ShaderMaterial',
  })
  
  addModel({
    modelSrc: pedal,
    position: { x: 0, y: 10, z: 0 },
  })

  // addModel({
  //   modelSrc: parrot,
  //   scale: { x: 0.075, y: 0.075, z: 0.075 },
  // })
  
}
