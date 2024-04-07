import { Text } from 'pixi.js'
import { TextComponent } from '../components/TextComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'

export class TextSystem implements System {
  setup (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(TextComponent.name)
    for (const entity of entities) {
      const textComponent = entityManager.getComponentByClassName(TextComponent.name, entity) as TextComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent

      textComponent.pixiText = new Text({
        text: textComponent.text,
        style: textComponent.style
      })

      pixiApp.stage.addChild(textComponent.pixiText)

      this.transformText(textComponent, transformComponent)
    }
  }

  update (): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(TextComponent.name)
    for (const entity of entities) {
      const textComponent = entityManager.getComponentByClassName(TextComponent.name, entity) as TextComponent
      const transformComponent = entityManager.getComponentByClassName(TransformComponent.name, entity) as TransformComponent

      textComponent.pixiText.text = textComponent.text
      textComponent.pixiText.style = textComponent.style

      this.transformText(textComponent, transformComponent)
    }
  }

  transformText (textComponent: TextComponent, transformComponent: TransformComponent): void {
    textComponent.pixiText.anchor = transformComponent.anchor
    textComponent.pixiText.x = transformComponent.x
    textComponent.pixiText.y = transformComponent.y
  }
}
