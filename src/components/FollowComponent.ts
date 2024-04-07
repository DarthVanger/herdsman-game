import { type Component } from '../ecsFramework/Component'
import { type Entity } from '../ecsFramework/Entity'

interface FollowComponentParams {
  targetEntity: Entity
}

export class FollowComponent implements Component {
  targetEntity: Entity

  constructor ({ targetEntity }: FollowComponentParams) {
    this.targetEntity = targetEntity
  }
}
