import { GameEventEmitterComponent } from '../../../components/GameEventEmitterComponent'
import { IsInsideAreaComponent } from '../../../components/IsInsideAreaComponent'
import { type State } from '../../../components/StateComponent'
import { type Entity } from '../../../ecsFramework/Entity'
import { entityManager } from '../../../ecsFramework/EntityManager'
import { GameEvent } from '../../../ecsFramework/GameEventManager'
import { animal } from '../Animal'

export class InTheYardState implements State {
  entity: Entity

  constructor (entity: Entity) {
    this.entity = entity
  }

  enter (): void {
    const gameEventEmitterComponent = entityManager.getComponentByClassName(GameEventEmitterComponent.name, this.entity) as GameEventEmitterComponent
    gameEventEmitterComponent.eventQueue.push(new GameEvent(animal.enteredYardEventName))

    entityManager.removeComponentByClassName(IsInsideAreaComponent.name, this.entity)
  }
}
