import { Sprite } from 'pixi.js'
import { entityManager } from '../ecsFramework/EntityManager'
import { SpriteComponent } from '../components/SpriteComponent'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { type System } from '../ecsFramework/System'
import { gameAssets } from '../GameAssets'

export class SpriteSystem implements System {
  setup (): void {
    this.createOrUpdateSprites()
  }

  update (): void {
    this.createOrUpdateSprites()
  }

  private createOrUpdateSprites (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(SpriteComponent.name)
    for (const entity of entities) {
      const spriteComponent = entityManager.getComponentByClassName(SpriteComponent.name, entity) as SpriteComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent

      if (spriteComponent.pixiSprite === undefined) {
        spriteComponent.pixiSprite = this.createPixiSprite(spriteComponent)
        pixiApp.stage.addChild(spriteComponent.pixiSprite)
      }

      this.transformSprite(spriteComponent.pixiSprite, transformComponent)
    }
  }

  private transformSprite (sprite: Sprite, transformComponent: TransformComponent): void {
    sprite.x = transformComponent.x
    sprite.y = transformComponent.y
    sprite.width = transformComponent.width
    sprite.height = transformComponent.height
    sprite.anchor.x = transformComponent.anchor.x
    sprite.anchor.y = transformComponent.anchor.y
  }

  private createPixiSprite (spriteComponent: SpriteComponent): Sprite {
    const sprite = new Sprite()
    sprite.texture = gameAssets.textures[spriteComponent.assetAlias]

    return sprite
  }
}
