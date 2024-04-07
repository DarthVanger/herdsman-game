import { entityManager } from '../ecsFramework/EntityManager'
import { FollowComponent } from '../components/FollowComponent'
import { type System } from '../ecsFramework/System'
import { TransformComponent } from '../components/TransformComponent'
import { computeVelocityVectorToTarget } from '../utils/physics'

export class FollowSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(FollowComponent.name)
    for (const entity of entities) {
      const followComponent = entityManager.getComponentByClassName(FollowComponent.name, entity) as FollowComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent
      const targetTransformComponent = entityManager.getComponentByClassName(TransformComponent.name, followComponent.targetEntity) as TransformComponent

      const velocityVector = computeVelocityVectorToTarget(transformComponent, targetTransformComponent, followComponent.followSpeed)
      const followAtDistance = targetTransformComponent.width
      const distance = Math.hypot(transformComponent.x - targetTransformComponent.x, transformComponent.y - targetTransformComponent.y)

      if (distance > followAtDistance) {
        transformComponent.x += velocityVector.x
        transformComponent.y += velocityVector.y
      }
    }
  }
}
