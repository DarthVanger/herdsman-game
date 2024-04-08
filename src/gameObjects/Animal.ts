import { SpriteComponent } from '../components/SpriteComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import animalImage from '../../assets/cat.png'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { pixiApp, getGameDimensions } from '../pixiApp'
import { MainHero } from './MainHero'
import { CaptureComponent } from '../components/CaptureComponent'
import { AnimalComponent } from '../components/AnimalComponent'
import { PatrolComponent } from '../components/PatrolComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'

export class Animal implements GameObject {
  static getInitialTransform (): Transform {
    const height = getGameDimensions().diagonal / 20
    const width = height / 1.8
    return {
      x: 0,
      y: 0,
      width,
      height,
      anchor: { x: 0.5, y: 0.5 }
    }
  }

  static create (transform: Transform, patrolAreaEntity: Entity): Entity {
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const mainHeroSpeed = MainHero.getSpeed(screenDiagonal)
    const speed = mainHeroSpeed / 2 + Math.random() * mainHeroSpeed / 2

    const entity = entityManager.createEntity()
    entityManager.addComponent(new TransformComponent(transform), entity)
    entityManager.addComponent(new SpriteComponent({ src: animalImage as string }), entity)
    entityManager.addComponent(new CaptureComponent({ targetTag: MainHero.tag, followSpeed: speed }), entity)
    entityManager.addComponent(new AnimalComponent(), entity)
    entityManager.addComponent(new PatrolComponent({ speed, patrolAreaEntity }), entity)

    return entity
  }
}
