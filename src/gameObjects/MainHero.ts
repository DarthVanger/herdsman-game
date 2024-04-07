import { SpriteComponent } from '../components/SpriteComponent'
import { GameObject } from '../ecsFramework/GameObject'
import cowboyImage from '../../assets/cowboy.webp'
import { MoveToClickPositionComponent } from '../components/MoveToClickPositionComponent'
import { TransformComponent } from '../components/TransformComponent'

export class MainHero extends GameObject {
  constructor () {
    super()
    this.addComponent(new TransformComponent({ width: 150, height: 150 / 1.31 }))
    this.addComponent(new SpriteComponent({ src: cowboyImage as string, anchor: { x: 0.5, y: 0.5 } }))
    this.addComponent(new MoveToClickPositionComponent())
  }
}
