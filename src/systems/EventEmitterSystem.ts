import { EventEmitterComponent } from '../components/EventEmitterComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { eventBus } from '../utils/eventBus'

export class EventEmitterSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(EventEmitterComponent.name)
    for (const entity of entities) {
      const eventEmitterComponent = entityManager.getComponentByClassName(EventEmitterComponent.name, entity) as EventEmitterComponent
      while (eventEmitterComponent.eventQueue.length > 0) {
        const event = eventEmitterComponent.eventQueue.shift()

        if (event === undefined) {
          throw new Error('Trying to shift empty event queue')
        }

        eventBus.emit(event)
      }
    }
  }
}
