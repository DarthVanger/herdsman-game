import { type PointData } from 'pixi.js'

export const computeVelocityVectorToTarget = (startingPoint: PointData, destinationPoint: PointData, speed: number): PointData => {
  const distX = destinationPoint.x - startingPoint.x
  const distY = destinationPoint.y - startingPoint.y
  const dist = Math.hypot(distX, distY)

  const velocityUnitVector = {
    x: distX / dist,
    y: distY / dist
  }

  return {
    x: velocityUnitVector.x * speed,
    y: velocityUnitVector.y * speed
  }
}
