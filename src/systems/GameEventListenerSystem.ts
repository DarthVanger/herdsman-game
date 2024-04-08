import { GameEventListenerComponent } from '../components/GameEventListenerComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { gameEventBus } from '../ecsFramework/gameEventBus'

export class GameEventListenerSystem implements System {
  setup (): void {
    this.addEventListenerOnce()
  }

  update (): void {
    this.addEventListenerOnce()
  }

  private addEventListenerOnce (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(GameEventListenerComponent.name)
    for (const entity of entities) {
      const gameEventListenerComponent = entityManager.getComponentByClassName(GameEventListenerComponent.name, entity) as GameEventListenerComponent<any>
      if (!gameEventListenerComponent.isAdded) {
        gameEventBus.addEventListener(gameEventListenerComponent.eventName, gameEventListenerComponent.eventListener)
        gameEventListenerComponent.isAdded = true
      }
    }
  }
}
