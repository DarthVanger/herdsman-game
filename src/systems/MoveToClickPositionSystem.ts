import { type System } from '../ecsFramework/System'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { TransformComponent } from '../components/TransformComponent'
import { computeVelocityVectorToTarget } from '../utils/physics'
import { type FederatedPointerEvent } from 'pixi.js'
import { RenderComponent } from '../components/RenderComponent'

export class MoveToClickPositionSystem implements System {
  setup (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(MoveToClickPositionComponent.name)
    for (const entity of entities) {
      const moveToClickPositionComponent = entityManager.getComponentByClassName(MoveToClickPositionComponent.name, entity) as MoveToClickPositionComponent

      const clickableAreaComponent = entityManager.getComponentByClassName(
        RenderComponent.name,
        moveToClickPositionComponent.clickableAreaEntity
      ) as RenderComponent

      const pixiDisplayObject = clickableAreaComponent.pixiDisplayObject
      pixiDisplayObject.eventMode = 'static'
      pixiDisplayObject.cursor = 'pointer'
      pixiDisplayObject.on('pointerdown', event => { this.handlePointerDown(event) })
    }
  }

  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(MoveToClickPositionComponent.name)
    for (const entity of entities) {
      const moveToClickPositionComponent = entityManager.getComponentByClassName(MoveToClickPositionComponent.name, entity) as MoveToClickPositionComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent

      if (moveToClickPositionComponent.destinationPoint === undefined) return

      const { destinationPoint } = moveToClickPositionComponent
      const distanceToDestination = Math.hypot(
        destinationPoint.x - transformComponent.x,
        destinationPoint.y - transformComponent.y
      )

      if (distanceToDestination <= moveToClickPositionComponent.speed) {
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
}
