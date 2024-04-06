import { Rectangle, type FederatedPointerEvent, type PointData } from 'pixi.js'
import { type System } from '../ecsFramework/System'
import { pixiApp } from '../pixiApp'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { TransformComponent } from '../components/TransformComponent'

export class MoveToClickPositionSystem implements System {
  setup (): void {
    pixiApp.stage.eventMode = 'static'
    pixiApp.stage.cursor = 'pointer'
    pixiApp.stage.hitArea = new Rectangle(0, 0, window.innerWidth, window.innerHeight)

    pixiApp.stage.on('pointerdown', event => { this.handlePointerDown(event) })
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

  handlePointerDown (event: FederatedPointerEvent): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(MoveToClickPositionComponent.name)
    for (const entity of entities) {
      const moveToClickPositionComponent = entityManager.getComponentByClassName(MoveToClickPositionComponent.name, entity) as MoveToClickPositionComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent

      moveToClickPositionComponent.destinationPoint = event.client.clone()

      moveToClickPositionComponent.velocityVector = this.computeVelocityVector(
        transformComponent, moveToClickPositionComponent.destinationPoint, moveToClickPositionComponent.speed
      )

      this.rotateInDirectionOfMovement(transformComponent, moveToClickPositionComponent.velocityVector)
    }
  }

  computeVelocityVector (transformComponent: TransformComponent, destinationPoint: PointData, speed: number): PointData {
    const distX = destinationPoint.x - transformComponent.x
    const distY = destinationPoint.y - transformComponent.y
    const dist = Math.hypot(distX, distY)

    const velocityUnitVector = {
      x: distX / dist,
      y: distY / dist
    }

    return {
      x: velocityUnitVector.x * speed,
      y: velocityUnitVector.y * speed
    }
  }

  computeDistanceToDestination (transformComponent: TransformComponent, destinationPoint: PointData): number {
    return Math.hypot(destinationPoint.x - transformComponent.x, destinationPoint.y - transformComponent.y)
  }

  rotateInDirectionOfMovement (transformComponent: TransformComponent, velocityVector: PointData): void {
    transformComponent.rotation = Math.atan2(velocityVector.y, velocityVector.x)
  }
}
