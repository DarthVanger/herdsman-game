import { SpriteComponent } from '../components/SpriteComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import mainHeroImage from '../../assets/main-hero.png'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { CaptureTargetComponent } from '../CaptureTargetComponent'
import { GameField } from './GameField'
import { entityManager } from '../ecsFramework/EntityManager'

export class MainHero implements GameObject {
  static tag = 'MainHero'

  static getSpeed (screenDiagonal: number): number {
    return screenDiagonal / 500
  }

  static create (): void {
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const x = pixiApp.renderer.width / 2
    const y = pixiApp.renderer.height / 2
    const width = screenDiagonal / 16
    const height = width * 1.3
    const speed = MainHero.getSpeed(screenDiagonal)

    const entity = entityManager.createEntity()
    entityManager.setEntityTag(MainHero.tag, entity)
    entityManager.addComponent(new TransformComponent({ x, y, width, height, anchor: { x: 0.5, y: 0.5 } }), entity)
    entityManager.addComponent(new SpriteComponent({ src: mainHeroImage as string }), entity)
    entityManager.addComponent(new MoveToClickPositionComponent({ clickableAreaTag: GameField.tag, speed }), entity)
    entityManager.addComponent(new CaptureTargetComponent(), entity)
  }
}
