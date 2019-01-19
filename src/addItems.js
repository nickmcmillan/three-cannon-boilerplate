import delay from 'delay'

// Adders
import addItem from './add/addItem'
import { addModel } from './add/addModel'

import texturePng from './textures/uv_test_bw_1024.png'


export default async function () {

  addItem({
    type: 'box',
    textureSrc: texturePng,
    position: {
      x: 0,
      y: 5,
      z: 0
    }
  })
  
  addItem({
    type: 'sphere',
    color: 'red',
    textureSrc: texturePng,
    position: {
      x: 0,
      y: 2,
      z: 0
    },
  })

  addItem({
    type: 'box',
    position: {
      x: 0,
      y: 20,
      z: 0
    }
  })

  // addItem({
  //   // color: 'yellow',//'#' + Math.floor(Math.random() * 16777215).toString(16)
  // })

  delay(500)


  
}
