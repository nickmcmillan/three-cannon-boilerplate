import delay from 'delay'

// Adders
import addCube from './add/addCube'
import addSphere from './add/addSphere'
import { addModel } from './add/addModel'


export default async function () {

  for (let i = 0; i < 5; i++) {
    addSphere({
      position: {
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 10,
      },
      radius: Math.random() * 3,
    })
    
  }

  // addCube({
  //   // color: 'yellow',//'#' + Math.floor(Math.random() * 16777215).toString(16)
  // })

}
