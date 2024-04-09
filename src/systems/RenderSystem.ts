import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { RenderComponent } from '../components/RenderComponent'
import { type Container, Sprite } from 'pixi.js'

export class RenderSystem implements System {
  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(RenderComponent.name)

    for (const entity of entities) {
      const renderComponent = entityManager.getComponentByClass(RenderComponent<Container>, entity)
      const transformComponent = entityManager.getComponentByClass(TransformComponent, entity)

      if (!renderComponent.isAddedToStage) {
        pixiApp.stage.addChild(renderComponent.pixiDisplayObject)
        renderComponent.isAddedToStage = true
      }

      this.transformPixiDisplayObject(renderComponent.pixiDisplayObject, transformComponent)
    }
  }

  private transformPixiDisplayObject (
    pixiDisplayObject: RenderComponent['pixiDisplayObject'],
    transformComponent: TransformComponent
  ): void {
    pixiDisplayObject.x = transformComponent.x
    pixiDisplayObject.y = transformComponent.y
    pixiDisplayObject.width = transformComponent.width
    pixiDisplayObject.height = transformComponent.height

    if (pixiDisplayObject instanceof Sprite) {
      pixiDisplayObject.anchor.x = transformComponent.anchor.x
      pixiDisplayObject.anchor.y = transformComponent.anchor.y
    }
  }
}
