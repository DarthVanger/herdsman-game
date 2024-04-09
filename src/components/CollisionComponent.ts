import { type Component } from '../ecsFramework/Component'
import { type Entity } from '../ecsFramework/Entity'

interface CollisionComponentParams {
  targetTag: string
  onCollision: (entity: Entity) => void
}

export class CollisionComponent implements Component {
  targetTag: string
  onCollision: (entity: Entity) => void

  constructor ({ targetTag, onCollision }: CollisionComponentParams) {
    this.targetTag = targetTag
    this.onCollision = onCollision
  }
}
