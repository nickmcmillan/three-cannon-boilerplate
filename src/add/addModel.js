import * as THREE from 'three'
import * as CANNON from 'cannon'
import GLTFLoader from 'three-gltf-loader';
import { meshes, scene } from '../three'
import { world, bodies } from '../cannon'
import { promisifyLoader } from '../utils/promisifyLoader'

THREE.Cache.enabled = true // so Three doesn't reload the gltf if used more than once

const vec3 = new THREE.Vector3()

export default async ({
  modelSrc,
  position = { x: 0, y: 5, z: 0 }, // start 5 meters above the ground
  velocity = { x: 0, y: 10, z: 0 }, // // with upwards velocity of 10
  // rotation = { x: 0, y: 0, z: 0,},
  mass = 5,
  angularDamping = 0.99, // default is 0.01 which just looks silly cos it spins for ages
  linearDamping = 0.01, // linear damping smooths out jitter
  angularVelocity = { x: 0, y: 0.5, z: 0.5, }, // modifying it a little so the items don't just drop perfectly (which looks unnatural)
}) => {

  const loader = new GLTFLoader()
  const mtlPromiseLoader = promisifyLoader(loader)
  const mesh = await mtlPromiseLoader.load(modelSrc).then(gltf => gltf.scene)
  
  // each item within the mesh needs to cast and receive shadow,
  // and be assigned a name
  mesh.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.name = mesh.uuid    
    }
  })

  // get dimensions from three  
  const tempBox = new THREE.Box3().setFromObject(mesh)
  const { x, y, z } = tempBox.getSize(vec3)
  // apply dimensions to cannon (but for some reason need to halve them)
  const shape = new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2))

  // THREE
  mesh.name = mesh.uuid
  meshes.push(mesh)
  scene.add(mesh)    

  // CANNON
  const body = new CANNON.Body({ mass, angularDamping, linearDamping, angularVelocity, shape })
  body.name = mesh.uuid
  body.position.set(position.x, position.y, position.z)
  body.velocity.set(velocity.x, velocity.y, velocity.z)
  world.add(body)
  bodies.push(body)
}
