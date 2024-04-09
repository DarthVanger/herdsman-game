import { GameEventEmitterComponent } from '../../../components/GameEventEmitterComponent'
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
    const gameEventEmitterComponent = entityManager.getComponentByClass(GameEventEmitterComponent, this.entity)

    if (gameEventEmitterComponent === undefined) {
      throw new Error('InTheYardState entity has no GameEventEmitterComponent')
    }

    gameEventEmitterComponent.eventQueue.push(new GameEvent(animal.enteredYardEventName))
  }
}
