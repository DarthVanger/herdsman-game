import { Assets, Sprite, type Texture } from 'pixi.js'
import { entityManager } from '../ecsFramework/EntityManager'
import { SpriteComponent } from '../components/SpriteComponent'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { type System } from '../ecsFramework/System'

export class SpriteSystem implements System {
  async setup (): Promise<void> {
    const entities = entityManager.getAllEntitiesByComponentClassName(SpriteComponent.name)
    const spriteComponents = entities.map(entity => entityManager.getComponentByClassName(SpriteComponent.name, entity) as SpriteComponent)
    const assets = spriteComponents.map(spriteComponent => ({
      alias: spriteComponent.src,
      src: spriteComponent.src
    }))

    const textures = await Assets.load<Record<string, Texture>>(assets)

    for (const entity of entities) {
      const spriteComponent = entityManager.getComponentByClassName(SpriteComponent.name, entity) as SpriteComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent
      const texture = textures[spriteComponent.src]
      spriteComponent.sprite = Sprite.from(texture)
      spriteComponent.sprite.anchor.set(spriteComponent.anchor.x, spriteComponent.anchor.y)
      this.transformSprite(spriteComponent.sprite, transformComponent)
      pixiApp.stage.addChild(spriteComponent.sprite)
    }
  }

  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(SpriteComponent.name)
    for (const entity of entities) {
      const spriteComponent = entityManager.getComponentByClassName(SpriteComponent.name, entity) as SpriteComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent
      this.transformSprite(spriteComponent.sprite, transformComponent)
    }
  }

  transformSprite (sprite: Sprite, transformComponent: TransformComponent): void {
    sprite.x = transformComponent.x
    sprite.y = transformComponent.y
    sprite.width = transformComponent.width
    sprite.height = transformComponent.height
    sprite.rotation = transformComponent.rotation
  }
}
