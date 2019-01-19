// Adders
import addItem from './add/addItem'
import addModel from './add/addModel'

import texturePng from './textures/uv_test_bw_1024.png'
import pedal from './models/pedal.glb'
import parrot from './models/parrot.glb'


export default async function () {

  addItem({
    type: 'box',
    dimensions: { x: 3, y: 1, z: 1 },
    textureSrc: texturePng,
    position: { x: 0, y: 5, z: 0 },
  })
  
  addItem({
    type: 'sphere',
    radius: 2.75,
    color: 'orange',
    textureSrc: texturePng,
    position: { x: 0, y: 2, z: 0 },
  })
  
  addModel({
    modelSrc: pedal,
    position: { x: 0, y: 10, z: 0 },
    // scale: { x: 1.5, y: 1.5, z: 1.5 },
  })

  // addModel({
  //   modelSrc: parrot,
  //   scale: { x: 0.075, y: 0.075, z: 0.075 },
  // })
  
}
