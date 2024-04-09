import { IsInsideAreaComponent } from '../components/IsInsideAreaComponent'
import { TransformComponent } from '../components/TransformComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { isBoxInsideBox } from '../utils/geometry'

export class IsInsideAreaSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(IsInsideAreaComponent.name)
    for (const entity of entities) {
      const isInsideAreaComponent = entityManager.getComponentByClass(IsInsideAreaComponent, entity)

      const targetEntities = entityManager.getAllEntitiesByTag(isInsideAreaComponent.targetTag)

      for (const targetEntity of targetEntities) {
        const transformComponent = entityManager.getComponentByClass(TransformComponent, entity)

        const targetTransformComponent = entityManager.getComponentByClass(TransformComponent, targetEntity)

        if (
          !isInsideAreaComponent.hasEntered &&
          isBoxInsideBox(transformComponent, targetTransformComponent)
        ) {
          isInsideAreaComponent.onEnter(targetEntity)
          isInsideAreaComponent.hasEntered = true
        } else {
          isInsideAreaComponent.hasEntered = false
        }
      }
    }
  }
}
