import { AnimalYardComponent } from '../components/AnimalYardComponent'
import { PatrolComponent } from '../components/PatrolComponent'
import { TransformComponent } from '../components/TransformComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { GameField } from '../gameObjects/GameField'
import { pixiApp } from '../pixiApp'
import { hasIntersection } from '../utils/geometry'
import { computeVelocityVectorToTarget } from '../utils/physics'

export class PatrolSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(PatrolComponent.name)
    for (const entity of entities) {
      const patrolComponent = entityManager.getComponentByClassName(PatrolComponent.name, entity) as PatrolComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent

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

      const yardEntities = entityManager.getAllEntitiesByComponentClassName(AnimalYardComponent.name)
      for (const yardEntity of yardEntities) {
        const yardTransformComponent = entityManager.getComponentByClassName(TransformComponent.name, yardEntity) as TransformComponent
        if (hasIntersection(transformComponent, yardTransformComponent)) {
          transformComponent.x -= patrolComponent.velocityVector.x
          transformComponent.y -= patrolComponent.velocityVector.y
          this.goToNewDestinationPoint(transformComponent, patrolComponent)
        }
      }
    }
  }

  private goToNewDestinationPoint (transformComponent: TransformComponent, patrolComponent: PatrolComponent): void {
    const randomPointOnGameField = {
      x: Math.random() * GameField.getWidth(pixiApp),
      y: Math.random() * GameField.getHeight(pixiApp)
    }

    patrolComponent.currentDestinationPoint = randomPointOnGameField
    patrolComponent.velocityVector = computeVelocityVectorToTarget(transformComponent, randomPointOnGameField, patrolComponent.speed)
  }
}
