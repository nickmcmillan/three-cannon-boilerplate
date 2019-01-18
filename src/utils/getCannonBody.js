import * as CANNON from 'cannon'

export default ({
  mass,
  angularDamping,
  linearDamping,
  angularVelocity,
  position,
  shape,
  mesh,
}) => {
  const body = new CANNON.Body({ mass, angularDamping, linearDamping, angularVelocity, shape })
  body.name = mesh.uuid
  body.position.set(position.x, position.y, position.z) 
  body.velocity.set(0, 10, 0) // with upwards velocity
  return body
}