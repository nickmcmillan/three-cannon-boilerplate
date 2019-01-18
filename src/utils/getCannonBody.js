import * as CANNON from 'cannon'

export default ({
  mass,
  angularDamping,
  linearDamping,
  angularVelocity,
  position,
  velocity,
  shape,
  mesh,
}) => {
  const body = new CANNON.Body({ mass, angularDamping, linearDamping, angularVelocity, shape })
  body.name = mesh.uuid
  body.position.set(position.x, position.y, position.z) 
  body.velocity.set(velocity.x, velocity.y, velocity.z)
  return body
}