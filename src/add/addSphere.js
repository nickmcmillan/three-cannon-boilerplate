import * as THREE from 'three'
import * as CANNON from 'cannon'
import getThreeMesh from '../utils/getThreeMesh'
import getCannonBody from '../utils/getCannonBody'
import { meshes, scene } from '../three'
import { world, bodies } from '../cannon'

export default ({
  // Cannon docs: http://schteppe.github.io/cannon.js/docs/classes/Body.html
  // Defaults below;
  position = { x: 0, y: 0, z: 0 },
  velocity = { x: 0, y: 0, z: 0 },
  radius = 0.8,
  mass = 1,
  angularDamping = 0.95, // It kind of determines how heavy an object feels when you pick it up. Range from 0 - 1. Default is 0.01 which just looks silly cos it swings for ages.
  linearDamping = 0.01, // Range from 0 - 1. Higher values make it feel 'stiffer'.
  angularVelocity = { x: 0, y: 0, z: 0.5, }, // modifying it a little so the items don't just drop perfectly (which looks unnatural)
  color = 0xffffff,
  material = 'MeshPhongMaterial'
}) => {

  const geo = new THREE.SphereBufferGeometry(radius, 25, 25) // sphere resolution
  const shape = new CANNON.Sphere(radius)

  // THREE
  const mesh = getThreeMesh({ geo, material, color, })
  meshes.push(mesh)
  scene.add(mesh)
  
  // CANNON
  const body = getCannonBody({ mesh, angularVelocity, linearDamping, angularDamping, angularVelocity, shape, mass, position, velocity })
  bodies.push(body)
  world.add(body)
}
