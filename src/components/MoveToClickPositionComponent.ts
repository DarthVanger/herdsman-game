import { type PointData } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'

interface MoveToClickPositionComponentParams {
  clickableAreaTag: string
}

export class MoveToClickPositionComponent implements Component {
  clickableAreaTag: string
  speed = 2
  rotationSpeed = 0.05
  destinationPoint: PointData | undefined
  velocityVector: PointData = { x: 0, y: 0 }

  constructor ({ clickableAreaTag }: MoveToClickPositionComponentParams) {
    this.clickableAreaTag = clickableAreaTag
  }
}
