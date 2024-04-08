import { StateComponent } from '../components/StateComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'

export class StateSystem implements System {
  setup (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(StateComponent.name)
    for (const entity of entities) {
      const stateComponent = entityManager.getComponentByClassName(StateComponent.name, entity) as StateComponent
      this.changeState(stateComponent)
    }
  }

  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(StateComponent.name)
    for (const entity of entities) {
      const stateComponent = entityManager.getComponentByClassName(StateComponent.name, entity) as StateComponent

      if (stateComponent.transitionToState !== undefined) {
        this.changeState(stateComponent)
      }

      stateComponent.state?.execute?.()
    }
  }

  private changeState (stateComponent: StateComponent): void {
    stateComponent.state?.exit?.()
    stateComponent.transitionToState?.enter?.()
    stateComponent.state = stateComponent.transitionToState
    stateComponent.transitionToState = undefined
  }
}
