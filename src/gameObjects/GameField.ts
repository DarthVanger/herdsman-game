import { SpriteComponent } from '../components/SpriteComponent'
import { TransformComponent } from '../components/TransformComponent'
import { GameObject } from '../ecsFramework/GameObject'
import gameFieldImage from '../../assets/game-field.jpeg'
import { pixiApp } from '../pixiApp'

export class GameField extends GameObject {
  constructor () {
    super()
    const width = pixiApp.renderer.width
    const height = pixiApp.renderer.height
    this.addComponent(new TransformComponent({ height, width }))
    this.addComponent(new SpriteComponent({ src: gameFieldImage as string }))
  }
}
