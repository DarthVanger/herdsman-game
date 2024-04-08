import { type PointData } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'

interface PatrolComponentParams {
  speed: number
}

export class PatrolComponent implements Component {
  speed: number
  currentDestinationPoint: PointData | undefined
  velocityVector: PointData

  constructor ({ speed }: PatrolComponentParams) {
    this.speed = speed
  }
}
