import { entityManager } from '../ecsFramework/EntityManager'
import { FollowComponent } from '../components/FollowComponent'
import { type System } from '../ecsFramework/System'
import { TransformComponent } from '../components/TransformComponent'
import { computeVelocityVectorToTarget } from '../utils/physics'

export class FollowSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(FollowComponent.name)
    for (const entity of entities) {
      const followComponent = entityManager.getComponentByClass(FollowComponent, entity)
      const transformComponent = entityManager.getComponentByClass(TransformComponent, entity)

      const targetTransformComponent = entityManager.getComponentByClass(TransformComponent, followComponent.targetEntity)

      const velocityVector = computeVelocityVectorToTarget(
        transformComponent, targetTransformComponent, followComponent.followSpeed
      )
      const followAtDistance = targetTransformComponent.width
      const distance = Math.hypot(
        transformComponent.x - targetTransformComponent.x,
        transformComponent.y - targetTransformComponent.y
      )

      if (distance > followAtDistance) {
        transformComponent.x += velocityVector.x
        transformComponent.y += velocityVector.y
      }
    }
  }
}
