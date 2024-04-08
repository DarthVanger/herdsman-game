import { SpriteComponent } from '../components/SpriteComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import yardImage from '../../assets/yard.png'
import { AnimalYardComponent } from '../components/AnimalYardComponent'
import { getGameDimensions } from '../pixiApp'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'

export class Yard implements GameObject {
  static getInitialTransform (): Transform {
    const width = getGameDimensions().width / 4
    const height = width
    return {
      x: getGameDimensions().width - width - getGameDimensions().width / 4,
      y: getGameDimensions().height / 2 - height / 2,
      width,
      height,
      anchor: { x: 0, y: 0 }
    }
  }

  static create (): Entity {
    const entity = entityManager.createEntity()
    entityManager.addComponent(new TransformComponent(Yard.getInitialTransform()), entity)
    entityManager.addComponent(new SpriteComponent({ src: yardImage as string }), entity)
    entityManager.addComponent(new AnimalYardComponent(), entity)

    return entity
  }
}
