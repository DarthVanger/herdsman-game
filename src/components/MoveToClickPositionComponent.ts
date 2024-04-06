import { type PointData } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'

export class MoveToClickPositionComponent implements Component {
  speed = 2
  rotationSpeed = 0.05
  destinationPoint: PointData | undefined
  velocityVector: PointData = { x: 0, y: 0 }
}
