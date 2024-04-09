import { CollisionComponent } from '../components/CollisionComponent'
import { TransformComponent } from '../components/TransformComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { hasIntersection } from '../utils/geometry'

export class CollisionSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(CollisionComponent.name)
    for (const entity of entities) {
      const collisionComponent = entityManager.getComponentByClass(CollisionComponent, entity)

      const targetEntities = entityManager.getAllEntitiesByTag(collisionComponent.targetTag)

      for (const targetEntity of targetEntities) {
        const transformComponent = entityManager.getComponentByClass(TransformComponent, entity)
        const targetTransformComponent = entityManager.getComponentByClass(TransformComponent, targetEntity)

        if (hasIntersection(transformComponent, targetTransformComponent)) {
          collisionComponent.onCollision(targetEntity)
        }
      }
    }
  }
}
