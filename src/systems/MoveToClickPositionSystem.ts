import { type System } from '../ecsFramework/System'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { TransformComponent } from '../components/TransformComponent'
import { computeVelocityVectorToTarget } from '../utils/physics'
import { SpriteComponent } from '../components/SpriteComponent'
import { type PointData, type FederatedPointerEvent } from 'pixi.js'

export class MoveToClickPositionSystem implements System {
  setup (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(MoveToClickPositionComponent.name)
    for (const entity of entities) {
      const moveToClickPositionComponent = entityManager.getComponentByClassName(MoveToClickPositionComponent.name, entity) as MoveToClickPositionComponent

      const clickableAreaComponent = entityManager.getComponentByClassName(
        SpriteComponent.name,
        moveToClickPositionComponent.clickableAreaEntity
      ) as SpriteComponent

      const pixiSprite = clickableAreaComponent.pixiSprite
      pixiSprite.eventMode = 'static'
      pixiSprite.cursor = 'pointer'
      pixiSprite.on('pointerdown', event => { this.handlePointerDown(event) })
    }
  }

  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(MoveToClickPositionComponent.name)
    for (const entity of entities) {
      const moveToClickPositionComponent = entityManager.getComponentByClassName(MoveToClickPositionComponent.name, entity) as MoveToClickPositionComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent

      if (moveToClickPositionComponent.destinationPoint === undefined) return

      if (this.computeDistanceToDestination(transformComponent, moveToClickPositionComponent.destinationPoint) <= moveToClickPositionComponent.speed) {
        transformComponent.x = moveToClickPositionComponent.destinationPoint.x
        transformComponent.y = moveToClickPositionComponent.destinationPoint.y

        moveToClickPositionComponent.destinationPoint = undefined
        moveToClickPositionComponent.velocityVector.x = 0
        moveToClickPositionComponent.velocityVector.y = 0
        return
      }

      transformComponent.x += moveToClickPositionComponent.velocityVector.x
      transformComponent.y += moveToClickPositionComponent.velocityVector.y
    }
  }

  private handlePointerDown (event: FederatedPointerEvent): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(MoveToClickPositionComponent.name)
    for (const entity of entities) {
      const moveToClickPositionComponent = entityManager.getComponentByClassName(MoveToClickPositionComponent.name, entity) as MoveToClickPositionComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent

      moveToClickPositionComponent.destinationPoint = event.client.clone()

      moveToClickPositionComponent.velocityVector = computeVelocityVectorToTarget(
        transformComponent, moveToClickPositionComponent.destinationPoint, moveToClickPositionComponent.speed
      )
    }
  }

  private computeDistanceToDestination (transformComponent: TransformComponent, destinationPoint: PointData): number {
    return Math.hypot(destinationPoint.x - transformComponent.x, destinationPoint.y - transformComponent.y)
  }
}
