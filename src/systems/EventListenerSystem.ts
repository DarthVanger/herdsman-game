import { EventListenerComponent } from '../components/EventListenerComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { eventBus } from '../utils/eventBus'

export class EventListenerSystem implements System {
  setup (): void {
    this.addEventListenerOnce()
  }

  update (): void {
    this.addEventListenerOnce()
  }

  private addEventListenerOnce (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(EventListenerComponent.name)
    for (const entity of entities) {
      const eventListenerComponent = entityManager.getComponentByClassName(EventListenerComponent.name, entity) as EventListenerComponent<any>
      if (!eventListenerComponent.isAdded) {
        eventBus.addEventListener(eventListenerComponent.eventName, eventListenerComponent.eventListener)
        eventListenerComponent.isAdded = true
      }
    }
  }
}
