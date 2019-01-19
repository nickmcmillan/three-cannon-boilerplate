import delay from 'delay'

// Adders
import addBox from './add/addBox'
import addSphere from './add/addSphere'
import { addModel } from './add/addModel'


export default async function () {

  addSphere({
    position: {
      x: 0,
      y: 5,
      z: 0
    }
  })
  
  addBox({
    position: {
      x: 0,
      y: 2,
      z: 0
    }
  })

  addSphere({
    position: {
      x: 0,
      y: 20,
      z: 0
    }
  })

  // addBox({
  //   // color: 'yellow',//'#' + Math.floor(Math.random() * 16777215).toString(16)
  // })

  delay(500)


  
}
