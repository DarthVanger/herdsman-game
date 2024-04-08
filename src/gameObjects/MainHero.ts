import { SpriteComponent } from '../components/SpriteComponent'
import { GameObject } from '../ecsFramework/GameObject'
import mainHeroImage from '../../assets/main-hero.png'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { CaptureTargetComponent } from '../CaptureTargetComponent'
import { GameField } from './GameField'

export class MainHero extends GameObject {
  static tag = 'MainHero'

  static getSpeed (screenDiagonal: number): number {
    return screenDiagonal / 500
  }

  constructor () {
    super()
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const x = pixiApp.renderer.width / 2
    const y = pixiApp.renderer.height / 2
    const width = screenDiagonal / 16
    const height = width * 1.3
    const speed = MainHero.getSpeed(screenDiagonal)
    this.setTag(MainHero.tag)
    this.addComponent(new TransformComponent({ x, y, width, height, anchor: { x: 0.5, y: 0.5 } }))
    this.addComponent(new SpriteComponent({ src: mainHeroImage as string }))
    this.addComponent(new MoveToClickPositionComponent({ clickableAreaTag: GameField.tag, speed }))
    this.addComponent(new CaptureTargetComponent())
  }
}
