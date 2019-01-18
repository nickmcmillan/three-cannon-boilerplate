import * as THREE from 'three'

export default ({
  geo,
  material,
  color,
}) => {
  const mat = new THREE[material]({ color })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.name = mesh.uuid
  return mesh
}