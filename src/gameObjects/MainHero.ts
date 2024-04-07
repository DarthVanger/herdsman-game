import { SpriteComponent } from '../components/SpriteComponent'
import { GameObject } from '../ecsFramework/GameObject'
import mainHeroImage from '../../assets/main-hero.png'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { CaptureTargetComponent } from '../CaptureTargetComponent'

export class MainHero extends GameObject {
  static tag = 'MainHero'

  constructor () {
    super()
    const width = pixiApp.renderer.width / 8
    const height = width * 1.3
    this.setTag(MainHero.tag)
    this.addComponent(new TransformComponent({ width, height }))
    this.addComponent(new SpriteComponent({ src: mainHeroImage as string, anchor: { x: 0.5, y: 0.5 } }))
    this.addComponent(new MoveToClickPositionComponent())
    this.addComponent(new CaptureTargetComponent())
  }
}
