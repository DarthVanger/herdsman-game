import { type Component } from '../ecsFramework/Component'
import { type Entity } from '../ecsFramework/Entity'

interface IsInsideAreaComponentParams {
  targetTag: string
  onEnter: (entity: Entity) => void
}

export class IsInsideAreaComponent implements Component {
  targetTag: string
  isCaptured: false
  onEnter: (entity: Entity) => void

  constructor ({ targetTag, onEnter }: IsInsideAreaComponentParams) {
    this.targetTag = targetTag
    this.onEnter = onEnter
  }
}
