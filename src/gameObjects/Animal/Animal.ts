import { SpriteComponent } from '../../components/SpriteComponent'
import { type GameObject } from '../../ecsFramework/GameObject'
import animalImage from '../../../assets/cat.png'
import { type Transform, TransformComponent } from '../../components/TransformComponent'
import { pixiApp, getGameDimensions } from '../../pixiApp'
import { mainHero } from '../MainHero'
import { entityManager } from '../../ecsFramework/EntityManager'
import { type Entity } from '../../ecsFramework/Entity'
import { StateComponent } from '../../components/StateComponent'
import { GameEventEmitterComponent } from '../../components/GameEventEmitterComponent'
import { PatrolState } from './states/PatrolState'

class Animal implements GameObject {
  enteredYardEventName = 'animalEnteredYard'

  getInitialTransform (): Transform {
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

  create (transform: Transform, patrolAreaEntity: Entity): Entity {
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const mainHeroSpeed = mainHero.getSpeed(screenDiagonal)
    const speed = mainHeroSpeed / 2 + Math.random() * mainHeroSpeed / 2

    const entity = entityManager.createEntity()
    entityManager.addComponent(new TransformComponent(transform), entity)
    entityManager.addComponent(new SpriteComponent({ src: animalImage as string }), entity)
    entityManager.addComponent(new StateComponent(new PatrolState(entity, patrolAreaEntity, speed)), entity)
    entityManager.addComponent(new GameEventEmitterComponent(), entity)

    return entity
  }
}

export const animal = new Animal()
