import { PatrolComponent } from '../components/PatrolComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { getRandomPointInsideBox, hasIntersection } from '../utils/geometry'
import { computeVelocityVectorToTarget } from '../utils/physics'

export class PatrolSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(PatrolComponent.name)

    for (const entity of entities) {
      const patrolComponent = entityManager.getComponentByClass(PatrolComponent, entity)

      const transformComponent = entityManager.getComponentByClass(TransformComponent, entity)

      if (patrolComponent.currentDestinationPoint === undefined) {
        this.goToNewDestinationPoint(transformComponent, patrolComponent)
        return
      }

      const distanceToDestination = Math.hypot(
        patrolComponent.currentDestinationPoint.x - transformComponent.x,
        patrolComponent.currentDestinationPoint.y - transformComponent.y
      )

      if (distanceToDestination <= patrolComponent.speed) {
        this.goToNewDestinationPoint(transformComponent, patrolComponent)
      }

      transformComponent.x += patrolComponent.velocityVector.x
      transformComponent.y += patrolComponent.velocityVector.y

      this.preventGoingIntoForbiddenAreas(transformComponent, patrolComponent)
    }
  }

  private preventGoingIntoForbiddenAreas (patroolingEntityTransform: Transform, patrolComponent: PatrolComponent): void {
    const forbiddenAreaEntities = entityManager.getAllEntitiesByTag(patrolComponent.forbiddenAreasTag)
    for (const forbiddenArea of forbiddenAreaEntities) {
      const forbiddenAreaTransform = entityManager.getComponentByClass(TransformComponent, forbiddenArea)

      if (hasIntersection(patroolingEntityTransform, forbiddenAreaTransform)) {
        patroolingEntityTransform.x -= patrolComponent.velocityVector.x
        patroolingEntityTransform.y -= patrolComponent.velocityVector.y
        this.goToNewDestinationPoint(patroolingEntityTransform, patrolComponent)
      }
    }
  }

  private goToNewDestinationPoint (transformComponent: TransformComponent, patrolComponent: PatrolComponent): void {
    const patrolAreaTransform = entityManager.getComponentByClass(TransformComponent, patrolComponent.patrolAreaEntity)

    const randomPointOnGameField = getRandomPointInsideBox(transformComponent, patrolAreaTransform)

    patrolComponent.currentDestinationPoint = randomPointOnGameField
    patrolComponent.velocityVector = computeVelocityVectorToTarget(
      transformComponent, randomPointOnGameField, patrolComponent.speed
    )
  }
}
