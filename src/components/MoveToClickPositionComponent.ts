import { type PointData } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'
import { type Entity } from '../ecsFramework/Entity'

interface MoveToClickPositionComponentParams {
  clickableAreaEntity: Entity
  speed: number
}

export class MoveToClickPositionComponent implements Component {
  clickableAreaTag: string
  clickableAreaEntity: Entity
  speed: number
  rotationSpeed = 0.05
  destinationPoint: PointData | undefined
  velocityVector: PointData = { x: 0, y: 0 }

  constructor ({ clickableAreaEntity, speed }: MoveToClickPositionComponentParams) {
    this.clickableAreaEntity = clickableAreaEntity
    this.speed = speed
  }
}
