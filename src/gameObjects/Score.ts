import { CanvasTextMetrics, Text, TextStyle } from 'pixi.js'
import { GameEventListenerComponent } from '../components/GameEventListenerComponent'
import { RenderComponent } from '../components/RenderComponent'
import { ScoreComponent } from '../components/ScoreComponent'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { type Entity } from '../ecsFramework/Entity'
import { entityManager } from '../ecsFramework/EntityManager'
import { type GameObject } from '../ecsFramework/GameObject'
import { getGameDimensions } from '../pixiApp'
import { animal } from './Animal/Animal'

class Score implements GameObject {
  getInitialTransform (): Transform {
    const fontSize = this.getFontSize()

    const width = CanvasTextMetrics.measureText(this.getInitialText(), this.getTextStyle()).width

    return {
      x: getGameDimensions().width / 2 - width / 2,
      y: fontSize / 2,
      height: fontSize,
      width,
      anchor: { x: 0, y: 0 }
    }
  }

  getInitialText (): string {
    return 'score: 0'
  }

  getTextStyle (): TextStyle {
    return new TextStyle({
      fontSize: this.getFontSize(),
      fill: 0xffffff,
      align: 'center'
    })
  }

  getFontSize (): number {
    return getGameDimensions().height / 36
  }

  create (): Entity {
    const entity = entityManager.createEntity()

    entityManager.addComponent(new TransformComponent(this.getInitialTransform()), entity)

    const pixiText = new Text({
      text: this.getInitialText(),
      style: this.getTextStyle()
    })

    entityManager.addComponent(new RenderComponent<Text>(pixiText), entity)

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
      const renderComponent = entityManager.getComponentByClassName(RenderComponent.name, scoreEntity) as RenderComponent<Text>

      scoreComponent.value++
      renderComponent.pixiDisplayObject.text = `score: ${scoreComponent.value}`
    }
  }
}

export const score = new Score()
