import { Assets, Sprite, type Texture } from 'pixi.js'
import { entityManager } from '../ecsFramework/EntityManager'
import { SpriteComponent } from '../components/SpriteComponent'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'

export class SpriteSystem {
  async setup (): Promise<void> {
    const entities = entityManager.getAllEntitiesByComponentClassName(SpriteComponent.name)
    const spriteComponents = entities.map(entity => entityManager.getComponentByClassName(SpriteComponent.name, entity) as SpriteComponent)
    const assets = spriteComponents.map(spriteComponent => ({
      alias: spriteComponent.url,
      src: spriteComponent.url
    }))

    const textures = await Assets.load<Record<string, Texture>>(assets)

    for (const entity of entities) {
      const spriteComponent = entityManager.getComponentByClassName(SpriteComponent.name, entity) as SpriteComponent
      const texture = textures[spriteComponent.url]
      spriteComponent.sprite = Sprite.from(texture)
      pixiApp.stage.addChild(spriteComponent.sprite)
    }
  }

  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(SpriteComponent.name)
    for (const entity of entities) {
      const spriteComponent = entityManager.getComponentByClassName(SpriteComponent.name, entity) as SpriteComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent
      spriteComponent.sprite.x = transformComponent.x
    }
  }
}
