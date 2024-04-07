import { ScoreComponent } from '../components/ScoreComponent'
import { ScriptComponent } from '../components/ScriptComponent'
// import { ScriptComponent } from '../components/ScriptComponent'
import { TextComponent } from '../components/TextComponent'
import { TransformComponent } from '../components/TransformComponent'
import { type Entity } from '../ecsFramework/Entity'
import { entityManager } from '../ecsFramework/EntityManager'
import { GameObject } from '../ecsFramework/GameObject'
import { type System } from '../ecsFramework/System'
import { pixiApp } from '../pixiApp'

export class Score extends GameObject {
  constructor () {
    super()
    const fontSize = pixiApp.renderer.height / 36

    this.addComponent(new TextComponent({
      text: 'score: 0',
      style: {
        fontSize,
        fill: 0xffffff
      }
    }))
    this.addComponent(new ScoreComponent())
    const x = pixiApp.renderer.width / 2
    const y = fontSize / 2
    this.addComponent(new TransformComponent({ x, y, anchor: { x: 0.5, y: 0 } }))
    this.addComponent(new ScriptComponent(new ScoreScript(this.entity)))
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
