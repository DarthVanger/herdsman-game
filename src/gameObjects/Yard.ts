import { type Transform, TransformComponent } from '../components/TransformComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import { getGameDimensions } from '../pixiApp'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'
import { AssetAlias } from '../AssetManager'
import { RenderComponent } from '../components/RenderComponent'
import { Texture, TilingSprite } from 'pixi.js'

class Yard implements GameObject {
  tag = 'Yard'

  getInitialTransform (): Transform {
    const width = getGameDimensions().width / 3
    const height = width
    return {
      x: getGameDimensions().width / 2 - width / 2,
      y: getGameDimensions().height / 2 - height / 2,
      width,
      height,
      anchor: { x: 0, y: 0 }
    }
  }

  create (): Entity {
    const entity = entityManager.createEntity()
    entityManager.setEntityTag(this.tag, entity)

    let tileScaleSize = getGameDimensions().width / 1700
    if (tileScaleSize < 0.4) {
      tileScaleSize = 0.4
    }

    const tilingSprite = new TilingSprite({
      texture: Texture.from(AssetAlias.YARD),
      tileScale: { x: tileScaleSize, y: tileScaleSize }
    })

    entityManager.addComponent(new TransformComponent(this.getInitialTransform()), entity)
    entityManager.addComponent(new RenderComponent(tilingSprite), entity)

    return entity
  }
}

export const yard = new Yard()
