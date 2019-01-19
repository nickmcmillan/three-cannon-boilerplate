import * as THREE from 'three'
import * as CANNON from 'cannon'
import { meshes, scene } from '../three'
import { world, bodies } from '../cannon'

export default ({
  // Cannon docs: http://schteppe.github.io/cannon.js/docs/classes/Body.html
  // Defaults below;
  type,
  position = { x: 0, y: 5, z: 0 }, // start 5 meters above the ground
  velocity = { x: 0, y: 10, z: 0 }, // // with upwards velocity of 10
  radius = 0.8,
  dimensions = { x: 1, y: 2, z: 1 },
  mass = 1,
  angularDamping = 0.95, // It kind of determines how heavy an object feels when you pick it up. Range from 0 - 1. Default is 0.01 which just looks silly cos it swings for ages.
  linearDamping = 0.01, // Range from 0 - 1. Higher values make it feel 'stiffer'.
  angularVelocity = { x: 0, y: 0, z: 0.5, }, // modifying it a little so the items don't just drop perfectly (which looks unnatural)
  color = 0x33ddee,
  material = 'MeshPhongMaterial',
  textureSrc, // a filepath to a texture image
}) => {

  if (!type) throw 'Type not supplied'

  let texture
  let geo
  let shape

  if (textureSrc) {
    const textureLoader = new THREE.TextureLoader()
    texture = textureLoader.load(textureSrc)
    // By default, this is set to 1, which applies no filtering. We will increase this to 16, which is the maximum level supported by most graphics cards.
    texture.anisotropy = 16
  }

  if (type === 'sphere') {
    geo = new THREE.SphereBufferGeometry(radius, 25, 25) // sphere resolution
    shape = new CANNON.Sphere(radius)
  }

  if (type === 'box') {
    const { x, y, z } = dimensions
    geo = new THREE.BoxBufferGeometry(x, y, z)
    shape = new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2))
  }

  // THREE
  const mat = new THREE[material]({ color, map: texture })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.name = mesh.uuid
  meshes.push(mesh)
  scene.add(mesh)


  // CANNON
  const body = new CANNON.Body({ mass, angularDamping, linearDamping, angularVelocity, shape })
  body.name = mesh.uuid
  body.position.set(position.x, position.y, position.z)
  body.velocity.set(velocity.x, velocity.y, velocity.z)
  bodies.push(body)
  world.add(body)
}
