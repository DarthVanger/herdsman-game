import { SpriteComponent } from '../components/SpriteComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import gameFieldImage from '../../assets/game-field.jpeg'
import { getGameDimensions } from '../pixiApp'
import { Score } from './Score'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'

export class GameField implements GameObject {
  static getInitialTransform (): Transform {
    const scoreTransform = Score.getInitialTransform()
    const y = scoreTransform.y + scoreTransform.height + scoreTransform.height / 2
    return {
      x: 0,
      y,
      width: getGameDimensions().width,
      height: getGameDimensions().height - y,
      anchor: { x: 0, y: 0 }
    }
  }

  static create (): Entity {
    const entity = entityManager.createEntity()
    entityManager.addComponent(new TransformComponent(GameField.getInitialTransform()), entity)
    entityManager.addComponent(new SpriteComponent({ src: gameFieldImage as string }), entity)

    return entity
  }
}
