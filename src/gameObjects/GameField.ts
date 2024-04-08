import { SpriteComponent } from '../components/SpriteComponent'
import { TransformComponent } from '../components/TransformComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import gameFieldImage from '../../assets/game-field.jpeg'
import { pixiApp } from '../pixiApp'
import { Score } from './Score'
import { type Application } from 'pixi.js'
import { entityManager } from '../ecsFramework/EntityManager'

export class GameField implements GameObject {
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

  static create (): void {
    const entity = entityManager.createEntity()
    const x = GameField.getX(pixiApp)
    const y = GameField.getY(pixiApp)
    const width = GameField.getWidth(pixiApp)
    const height = GameField.getHeight(pixiApp)
    entityManager.setEntityTag(GameField.tag, entity)
    entityManager.addComponent(new TransformComponent({ x, y, width, height }), entity)
    entityManager.addComponent(new SpriteComponent({ src: gameFieldImage as string }), entity)
  }
}
