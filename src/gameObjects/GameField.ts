import { SpriteComponent } from '../components/SpriteComponent'
import { TransformComponent } from '../components/TransformComponent'
import { GameObject } from '../ecsFramework/GameObject'
import gameFieldImage from '../../assets/game-field.jpeg'
import { pixiApp } from '../pixiApp'
import { Score } from './Score'

export class GameField extends GameObject {
  constructor () {
    super()
    const scoreBottomY = Score.getY(pixiApp) + Score.getHeight(pixiApp)
    const y = scoreBottomY + Score.getFontSize(pixiApp) / 2
    const width = pixiApp.renderer.width
    const height = pixiApp.renderer.height - scoreBottomY
    this.addComponent(new TransformComponent({ y, width, height }))
    this.addComponent(new SpriteComponent({ src: gameFieldImage as string }))
  }
}
