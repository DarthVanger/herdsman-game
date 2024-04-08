import { SpriteComponent } from '../components/SpriteComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import mainHeroImage from '../../assets/main-hero.png'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { getGameDimensions, pixiApp } from '../pixiApp'
import { FolloweeComponent } from '../components/FolloweeCompoent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'

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

  getSpeed (screenDiagonal: number): number {
    return screenDiagonal / 500
  }

  create (clickableAreaEntity: Entity): Entity {
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const speed = this.getSpeed(screenDiagonal)

    const entity = entityManager.createEntity()
    entityManager.setEntityTag(this.tag, entity)
    entityManager.addComponent(new TransformComponent(this.getInitialTransform()), entity)
    entityManager.addComponent(new SpriteComponent({ src: mainHeroImage as string }), entity)
    entityManager.addComponent(new MoveToClickPositionComponent({
      clickableAreaEntity,
      speed
    }), entity)
    entityManager.addComponent(new FolloweeComponent({ maxGroupSize: 5 }), entity)

    return entity
  }
}

export const mainHero = new MainHero()
