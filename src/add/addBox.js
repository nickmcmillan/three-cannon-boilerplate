import * as THREE from 'three'
import * as CANNON from 'cannon'
import getThreeMesh from '../utils/getThreeMesh'
import getCannonBody from '../utils/getCannonBody'
import { meshes, scene } from '../three'
import { world, bodies } from '../cannon'

export default ({
  position = { x: 0, y: 0, z: 0 },
  velocity = { x: 0, y: 0, z: 0 },
  dimensions = { x: 1, y: 2, z: 1 },
  mass = 1,
  angularDamping = 0.95,
  linearDamping = 0.01,
  angularVelocity = { x: 0, y: 0, z: 0.5 },
  color = 0xbad455,
  material = 'MeshPhongMaterial'
}) => {

  const { x, y, z } = dimensions
  const geo = new THREE.BoxBufferGeometry(x, y, z)
  const shape = new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2))

  // THREE
  const mesh = getThreeMesh({ geo, material, color, })
  meshes.push(mesh)
  scene.add(mesh)


  // CANNON
  const body = getCannonBody({ mesh, angularDamping, linearDamping, angularVelocity, velocity, shape, mass, position })
  bodies.push(body)
  world.add(body)

}
