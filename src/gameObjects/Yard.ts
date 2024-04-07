import { SpriteComponent } from '../components/SpriteComponent'
import { TransformComponent } from '../components/TransformComponent'
import { GameObject } from '../ecsFramework/GameObject'
import yardImage from '../../assets/yard.png'
import { pixiApp } from '../pixiApp'

export class Yard extends GameObject {
  constructor () {
    super()
    const width = pixiApp.renderer.width / 4
    const height = width
    const x = pixiApp.renderer.width - width - pixiApp.renderer.width / 4
    const y = pixiApp.renderer.height / 2 - height / 2
    this.addComponent(new TransformComponent({ x, y, height, width }))
    this.addComponent(new SpriteComponent({ src: yardImage as string }))
  }
}
