import { type Component } from '../ecsFramework/Component'
import { type Entity } from '../ecsFramework/Entity'

interface FollowComponentParams {
  targetEntity: Entity
  followSpeed: number
}

export class FollowComponent implements Component {
  targetEntity: Entity
  followSpeed: number

  constructor ({ targetEntity, followSpeed }: FollowComponentParams) {
    this.targetEntity = targetEntity
    this.followSpeed = followSpeed
  }
}
