import { type PointData } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'

interface MoveToClickPositionComponentParams {
  clickableAreaTag: string
  speed: number
}

export class MoveToClickPositionComponent implements Component {
  clickableAreaTag: string
  speed: number
  rotationSpeed = 0.05
  destinationPoint: PointData | undefined
  velocityVector: PointData = { x: 0, y: 0 }

  constructor ({ clickableAreaTag, speed }: MoveToClickPositionComponentParams) {
    this.clickableAreaTag = clickableAreaTag
    this.speed = speed
  }
}
