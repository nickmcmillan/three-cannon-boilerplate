import delay from 'delay'

// Adders
import addCube from './add/addCube'
import addSphere from './add/addSphere'
import { addModel } from './add/addModel'


export default async function () {

  addSphere({ position: { x: 0, y: 10, z: 0 } })
  addCube({
  })
  addSphere({
    position: {
      x: 0,
      y: 20,
      z: 0
    }
  })

  // addCube({
  //   // color: 'yellow',//'#' + Math.floor(Math.random() * 16777215).toString(16)
  // })

  delay(500)


  
}
