import { type Transform, TransformComponent } from '../components/TransformComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import { getGameDimensions } from '../pixiApp'
import { score } from './Score'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'
import { AssetAlias } from '../AssetManager'
import { RenderComponent } from '../components/RenderComponent'
import { Texture, TilingSprite } from 'pixi.js'

class GameField implements GameObject {
  getInitialTransform (): Transform {
    const scoreTransform = score.getInitialTransform()
    const y = scoreTransform.y + scoreTransform.height + scoreTransform.height / 2
    return {
      x: 0,
      y,
      width: getGameDimensions().width,
      height: getGameDimensions().height - y,
      anchor: { x: 0, y: 0 }
    }
  }

  create (): Entity {
    const entity = entityManager.createEntity()

    const tilingSprite = new TilingSprite({
      texture: Texture.from(AssetAlias.GAME_FIELD)
    })

    entityManager.addComponent(new TransformComponent(this.getInitialTransform()), entity)
    entityManager.addComponent(new RenderComponent(tilingSprite), entity)

    return entity
  }
}

export const gameField = new GameField()
