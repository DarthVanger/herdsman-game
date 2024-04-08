import { EventListenerComponent } from '../components/EventListenerComponent'
import { ScoreComponent } from '../components/ScoreComponent'
import { ScriptComponent } from '../components/ScriptComponent'
import { TextComponent } from '../components/TextComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { type Entity } from '../ecsFramework/Entity'
import { entityManager } from '../ecsFramework/EntityManager'
import { type GameObject } from '../ecsFramework/GameObject'
import { type System } from '../ecsFramework/System'
import { getGameDimensions } from '../pixiApp'
import { Animal } from './Animal'

export class Score implements GameObject {
  static getInitialTransform (): Transform {
    const fontSize = Score.getFontSize()
    return {
      x: getGameDimensions().width / 2,
      y: fontSize / 2,
      height: fontSize,
      width: 0,
      anchor: { x: 0.5, y: 0 }
    }
  }

  static getFontSize (): number {
    return getGameDimensions().height / 36
  }

  static create (): Entity {
    const entity = entityManager.createEntity()

    entityManager.addComponent(new TransformComponent(Score.getInitialTransform()), entity)

    entityManager.addComponent(new TextComponent({
      text: 'score: 0',
      style: {
        fontSize: Score.getFontSize(),
        fill: 0xffffff
      }
    }), entity)

    entityManager.addComponent(new ScoreComponent(), entity)
    entityManager.addComponent(new ScriptComponent(new ScoreScript(entity)), entity)
    entityManager.addComponent(new EventListenerComponent<never>(
      Animal.enteredYardEventName, () => {
        Score.handleAnimalYardEnter()
      }),
    entity
    )

    return entity
  }

  private static handleAnimalYardEnter (): void {
    const scoreEntities = entityManager.getAllEntitiesByComponentClassName(ScoreComponent.name)
    for (const scoreEntity of scoreEntities) {
      const scoreComponent = entityManager.getComponentByClassName(ScoreComponent.name, scoreEntity) as ScoreComponent
      const textComponent = entityManager.getComponentByClassName(TextComponent.name, scoreEntity) as TextComponent

      scoreComponent.value++
      textComponent.text = `score: ${scoreComponent.value}`
    }
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
