import { type PointData } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'
import { type Entity } from '../ecsFramework/Entity'

interface PatrolComponentParams {
  speed: number
  patrolAreaEntity: Entity
}

export class PatrolComponent implements Component {
  speed: number
  currentDestinationPoint: PointData | undefined
  velocityVector: PointData
  patrolAreaEntity: Entity

  constructor ({ speed, patrolAreaEntity }: PatrolComponentParams) {
    this.speed = speed
    this.patrolAreaEntity = patrolAreaEntity
  }
}
