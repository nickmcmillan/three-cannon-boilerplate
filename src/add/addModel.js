import * as THREE from 'three'
import * as CANNON from 'cannon'
import GLTFLoader from 'three-gltf-loader';
import { mixers } from '../index'
import { meshes, scene } from '../three'
import { world, bodies } from '../cannon'
import { promisifyLoader } from '../utils/promisifyLoader'

THREE.Cache.enabled = true // so Three doesn't reload the gltf if used more than once

const vec3 = new THREE.Vector3()

const onProgress = function (e) {
  // console.log(e)
}
const onError = function (e) {
  // console.log(e)
}

export default async ({
  modelSrc,
  position = { x: 0, y: 1, z: 0 }, // start 5 meters above the ground
  velocity = { x: 0, y: 0, z: 0 },
  // rotation = { x: 0, y: 0, z: 0,},
  mass = 5,
  scale,
  angularDamping = 0.99, // default is 0.01 which just looks silly cos it spins for ages
  linearDamping = 0.01, // linear damping smooths out jitter
  angularVelocity = { x: 0, y: 0.5, z: 0.5, }, // modifying it a little so the items don't just drop perfectly (which looks unnatural)
}) => {
  
  const loader = new GLTFLoader()
  const promisedLoader = promisifyLoader(loader, onProgress, onError)
  const gltf = await promisedLoader.load(modelSrc)
  
  // handle any asset which has built-in animation
  if (gltf.animations.length) {
    const animation = gltf.animations[0]    
    const mixer = new THREE.AnimationMixer(gltf.scene)
    mixers.push(mixer)
    const action = mixer.clipAction(animation)
    action.play()
  }
  
  // each item within the mesh needs to cast and receive shadow,
  // and be assigned a name
  gltf.scene.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.name = gltf.scene.uuid    
      if (scale) child.scale.set(scale.x, scale.y, scale.z)
    }
  })

  // get dimensions from three  
  const tempBox = new THREE.Box3().setFromObject(gltf.scene)
  const { x, y, z } = tempBox.getSize(vec3)
  // apply dimensions to cannon (but for some reason need to halve them)
  const shape = new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2))

  // THREE
  gltf.scene.name = gltf.scene.uuid
  meshes.push(gltf.scene)
  scene.add(gltf.scene)    

  // CANNON
  const body = new CANNON.Body({ mass, angularDamping, linearDamping, angularVelocity, shape })
  body.name = gltf.scene.uuid
  body.position.set(position.x, position.y, position.z)
  body.velocity.set(velocity.x, velocity.y, velocity.z)
  world.add(body)
  bodies.push(body)
}
