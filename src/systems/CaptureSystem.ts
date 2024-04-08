import { CaptureTargetComponent } from '../CaptureTargetComponent'
import { CaptureComponent } from '../components/CaptureComponent'
import { FollowComponent } from '../components/FollowComponent'
import { PatrolComponent } from '../components/PatrolComponent'
import { TransformComponent } from '../components/TransformComponent'
import { type Entity } from '../ecsFramework/Entity'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'

export class CaptureSystem implements System {
  private readonly groupSize = 5

  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(CaptureComponent.name)
    for (const entity of entities) {
      const captureComponent = entityManager.getComponentByClassName(CaptureComponent.name, entity) as CaptureComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent
      const targetEntities = entityManager.getAllEntitiesByTag(captureComponent.targetTag)
      for (const targetEntity of targetEntities) {
        const targetTransformComponent = entityManager.getComponentByClassName(TransformComponent.name, targetEntity) as TransformComponent
        const targetCaptureTargetComponent = entityManager.getComponentByClassName(CaptureTargetComponent.name, targetEntity) as CaptureTargetComponent
        const captureRadius = transformComponent.width
        const distance = Math.hypot(transformComponent.x - targetTransformComponent.x, transformComponent.y - targetTransformComponent.y)
        if (distance < captureRadius && targetCaptureTargetComponent.groupSize < targetCaptureTargetComponent.maxGroupSize) {
          this.capture(entity, targetEntity, captureComponent)
          targetCaptureTargetComponent.groupSize++
        }
      }
    }
  }

  private capture (entity: Entity, targetEntity: Entity, captureComponent: CaptureComponent): void {
    entityManager.removeComponentByClassName(CaptureComponent.name, entity)
    entityManager.removeComponentByClassName(PatrolComponent.name, entity)
    entityManager.addComponent(new FollowComponent({ targetEntity, followSpeed: captureComponent.followSpeed }), entity)
  }
}
