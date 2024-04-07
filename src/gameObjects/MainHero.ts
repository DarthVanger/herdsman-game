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

  constructor () {
    super()
    const x = pixiApp.renderer.width / 2
    const y = pixiApp.renderer.height / 2
    const width = pixiApp.renderer.width / 8
    const height = width * 1.3
    this.setTag(MainHero.tag)
    this.addComponent(new TransformComponent({ x, y, width, height }))
    this.addComponent(new SpriteComponent({ src: mainHeroImage as string, anchor: { x: 0.5, y: 0.5 } }))
    this.addComponent(new MoveToClickPositionComponent({ clickableAreaTag: GameField.tag }))
    this.addComponent(new CaptureTargetComponent())
  }
}
