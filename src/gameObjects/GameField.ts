import { SpriteComponent } from '../components/SpriteComponent'
import { TransformComponent } from '../components/TransformComponent'
import { GameObject } from '../ecsFramework/GameObject'
import gameFieldImage from '../../assets/game-field.jpeg'
import { pixiApp } from '../pixiApp'
import { Score } from './Score'
import { type Application } from 'pixi.js'

export class GameField extends GameObject {
  static tag: 'GameField'

  static getX (pixiApp: Application): number {
    return 0
  }

  static getY (pixiApp: Application): number {
    return Score.getY(pixiApp) + Score.getHeight(pixiApp) + Score.getFontSize(pixiApp) / 2
  }

  static getWidth (pixiApp: Application): number {
    return pixiApp.renderer.width
  }

  static getHeight (pixiApp: Application): number {
    return pixiApp.renderer.height - (Score.getY(pixiApp) + Score.getHeight(pixiApp))
  }

  constructor () {
    super()
    const x = GameField.getX(pixiApp)
    const y = GameField.getY(pixiApp)
    const width = GameField.getWidth(pixiApp)
    const height = GameField.getHeight(pixiApp)
    this.setTag(GameField.tag)
    this.addComponent(new TransformComponent({ x, y, width, height }))
    this.addComponent(new SpriteComponent({ src: gameFieldImage as string }))
  }
}
