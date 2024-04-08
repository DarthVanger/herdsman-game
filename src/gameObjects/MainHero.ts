import { SpriteComponent } from '../components/SpriteComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import mainHeroImage from '../../assets/main-hero.png'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { getGameDimensions, pixiApp } from '../pixiApp'
import { CaptureTargetComponent } from '../components/CaptureTargetComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'

export class MainHero implements GameObject {
  static tag = 'MainHero'

  static getInitialTransform (): Transform {
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

  static getSpeed (screenDiagonal: number): number {
    return screenDiagonal / 500
  }

  static create (clickableAreaEntity: Entity): Entity {
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const speed = MainHero.getSpeed(screenDiagonal)

    const entity = entityManager.createEntity()
    entityManager.setEntityTag(MainHero.tag, entity)
    entityManager.addComponent(new TransformComponent(MainHero.getInitialTransform()), entity)
    entityManager.addComponent(new SpriteComponent({ src: mainHeroImage as string }), entity)
    entityManager.addComponent(new MoveToClickPositionComponent({
      clickableAreaEntity,
      speed
    }), entity)
    entityManager.addComponent(new CaptureTargetComponent(), entity)

    return entity
  }
}
