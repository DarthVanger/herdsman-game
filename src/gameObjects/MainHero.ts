import { type GameObject } from '../ecsFramework/GameObject'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { getGameDimensions } from '../pixiApp'
import { FolloweeComponent } from '../components/FolloweeCompoent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'
import { AssetAlias } from '../AssetManager'
import { RenderComponent } from '../components/RenderComponent'
import { Sprite } from 'pixi.js'

export class MainHero implements GameObject {
  tag = 'MainHero'

  getInitialTransform (): Transform {
    const width = getGameDimensions().diagonal / 16
    const height = width * 1.3

    return {
      x: getGameDimensions().width / 2,
      y: getGameDimensions().height / 2,
      width,
      height,
      anchor: { x: 0.5, y: 0.5 }
    }
  }

  getSpeed (): number {
    return getGameDimensions().diagonal / 500
  }

  create (clickableAreaEntity: Entity): Entity {
    const entity = entityManager.createEntity()
    entityManager.setEntityTag(this.tag, entity)
    entityManager.addComponent(new TransformComponent(this.getInitialTransform()), entity)
    entityManager.addComponent(new RenderComponent(Sprite.from(AssetAlias.MAIN_HERO)), entity)
    entityManager.addComponent(new MoveToClickPositionComponent({
      clickableAreaEntity,
      speed: this.getSpeed()
    }), entity)
    entityManager.addComponent(new FolloweeComponent({ maxGroupSize: 5 }), entity)

    return entity
  }
}

export const mainHero = new MainHero()
