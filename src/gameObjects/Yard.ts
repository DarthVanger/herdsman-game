import { SpriteComponent } from '../components/SpriteComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import yardImage from '../../assets/yard.png'
import { getGameDimensions } from '../pixiApp'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'

class Yard implements GameObject {
  tag = 'Yard'

  getInitialTransform (): Transform {
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

  create (): Entity {
    const entity = entityManager.createEntity()
    entityManager.setEntityTag(this.tag, entity)
    entityManager.addComponent(new TransformComponent(this.getInitialTransform()), entity)
    entityManager.addComponent(new SpriteComponent({ src: yardImage as string }), entity)

    return entity
  }
}

export const yard = new Yard()
