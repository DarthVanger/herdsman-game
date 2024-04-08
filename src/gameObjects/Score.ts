import { type Application } from 'pixi.js'
import { ScoreComponent } from '../components/ScoreComponent'
import { ScriptComponent } from '../components/ScriptComponent'
import { TextComponent } from '../components/TextComponent'
import { TransformComponent } from '../components/TransformComponent'
import { type Entity } from '../ecsFramework/Entity'
import { entityManager } from '../ecsFramework/EntityManager'
import { type GameObject } from '../ecsFramework/GameObject'
import { type System } from '../ecsFramework/System'
import { pixiApp } from '../pixiApp'

export class Score implements GameObject {
  static getFontSize (pixiApp: Application): number {
    return pixiApp.renderer.height / 36
  }

  static getY (pixiApp: Application): number {
    return Score.getFontSize(pixiApp) / 2
  }

  static getHeight (pixiApp: Application): number {
    return Score.getFontSize(pixiApp)
  }

  static create (): void {
    const fontSize = Score.getFontSize(pixiApp)
    const x = pixiApp.renderer.width / 2
    const y = fontSize / 2

    const entity = entityManager.createEntity()

    entityManager.addComponent(new TransformComponent({ x, y, anchor: { x: 0.5, y: 0 } }), entity)

    entityManager.addComponent(new TextComponent({
      text: 'score: 0',
      style: {
        fontSize,
        fill: 0xffffff
      }
    }), entity)

    entityManager.addComponent(new ScoreComponent(), entity)
    entityManager.addComponent(new ScriptComponent(new ScoreScript(entity)), entity)
  }
}

class ScoreScript implements System {
  entity: Entity

  constructor (entity: Entity) {
    this.entity = entity
  }

  update (): void {
    const scoreComponent = entityManager.getComponentByClassName(ScoreComponent.name, this.entity) as ScoreComponent
    const textComponent = entityManager.getComponentByClassName(TextComponent.name, this.entity) as TextComponent
    textComponent.text = `score: ${scoreComponent.value}`
  }
}
