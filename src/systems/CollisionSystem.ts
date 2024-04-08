import { CollisionComponent } from '../components/CollisionComponent'
import { TransformComponent } from '../components/TransformComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { hasIntersection } from '../utils/geometry'

export class CollisionSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(CollisionComponent.name)
    for (const entity of entities) {
      const collisionComponent = entityManager.getComponentByClassName(CollisionComponent.name, entity) as CollisionComponent
      const targetEntities = entityManager.getAllEntitiesByTag(collisionComponent.targetTag)

      for (const targetEntity of targetEntities) {
        const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent
        const targetTransformComponent = entityManager.getComponentByClassName(TransformComponent.name, targetEntity) as TransformComponent

        if (hasIntersection(transformComponent, targetTransformComponent)) {
          collisionComponent.onCollision(targetEntity)
        }
      }
    }
  }
}
