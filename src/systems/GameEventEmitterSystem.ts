import { GameEventEmitterComponent } from '../components/GameEventEmitterComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { gameEventManager } from '../ecsFramework/GameEventManager'

export class GameEventEmitterSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(GameEventEmitterComponent.name)
    for (const entity of entities) {
      const eventEmitterComponent = entityManager.getComponentByClassName(
        GameEventEmitterComponent.name,
        entity
      ) as GameEventEmitterComponent

      while (eventEmitterComponent.eventQueue.length > 0) {
        const event = eventEmitterComponent.eventQueue.shift()

        if (event === undefined) {
          throw new Error('Trying to shift empty event queue')
        }

        gameEventManager.emit(event)
      }
    }
  }
}
