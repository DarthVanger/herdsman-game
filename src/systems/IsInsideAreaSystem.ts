import { IsInsideAreaComponent } from '../components/IsInsideAreaComponent'
import { TransformComponent } from '../components/TransformComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { isBoxInsideBox } from '../utils/geometry'

export class IsInsideAreaSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(IsInsideAreaComponent.name)
    for (const entity of entities) {
      const isInsideAreaComponent = entityManager.getComponentByClassName(IsInsideAreaComponent.name, entity) as IsInsideAreaComponent
      const targetEntities = entityManager.getAllEntitiesByTag(isInsideAreaComponent.targetTag)

      for (const targetEntity of targetEntities) {
        const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent
        const targetTransformComponent = entityManager.getComponentByClassName(TransformComponent.name, targetEntity) as TransformComponent

        if (isBoxInsideBox(transformComponent, targetTransformComponent)) {
          isInsideAreaComponent.onEnter(targetEntity)
        }
      }
    }
  }
}
