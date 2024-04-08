import { GameEventListenerComponent } from '../components/GameEventListenerComponent'
import { ScoreComponent } from '../components/ScoreComponent'
import { TextComponent } from '../components/TextComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { type Entity } from '../ecsFramework/Entity'
import { entityManager } from '../ecsFramework/EntityManager'
import { type GameObject } from '../ecsFramework/GameObject'
import { getGameDimensions } from '../pixiApp'
import { animal } from './Animal'

class Score implements GameObject {
  getInitialTransform (): Transform {
    const fontSize = this.getFontSize()

    return {
      x: getGameDimensions().width / 2,
      y: fontSize / 2,
      height: fontSize,
      width: 0,
      anchor: { x: 0.5, y: 0 }
    }
  }

  getFontSize (): number {
    return getGameDimensions().height / 36
  }

  create (): Entity {
    const entity = entityManager.createEntity()

    entityManager.addComponent(new TransformComponent(this.getInitialTransform()), entity)

    entityManager.addComponent(new TextComponent({
      text: 'score: 0',
      style: {
        fontSize: this.getFontSize(),
        fill: 0xffffff
      }
    }), entity)

    entityManager.addComponent(new ScoreComponent(), entity)
    entityManager.addComponent(new GameEventListenerComponent<never>(
      animal.enteredYardEventName, () => {
        this.handleAnimalYardEnter()
      }),
    entity
    )

    return entity
  }

  private handleAnimalYardEnter (): void {
    const scoreEntities = entityManager.getAllEntitiesByComponentClassName(ScoreComponent.name)
    for (const scoreEntity of scoreEntities) {
      const scoreComponent = entityManager.getComponentByClassName(ScoreComponent.name, scoreEntity) as ScoreComponent
      const textComponent = entityManager.getComponentByClassName(TextComponent.name, scoreEntity) as TextComponent

      scoreComponent.value++
      textComponent.text = `score: ${scoreComponent.value}`
    }
  }
}

export const score = new Score()
