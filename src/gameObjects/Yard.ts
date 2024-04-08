import { SpriteComponent } from '../components/SpriteComponent'
import { TransformComponent } from '../components/TransformComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import yardImage from '../../assets/yard.png'
import { AnimalYardComponent } from '../components/AnimalYardComponent'
import { type Application } from 'pixi.js'
import { pixiApp } from '../pixiApp'
import { entityManager } from '../ecsFramework/EntityManager'

export class Yard implements GameObject {
  static getTransform (pixiApp: Application): TransformComponent {
    const width = pixiApp.renderer.width / 4
    const height = width
    return {
      x: pixiApp.renderer.width - width - pixiApp.renderer.width / 4,
      y: pixiApp.renderer.height / 2 - height / 2,
      width,
      height,
      anchor: { x: 0, y: 0 }
    }
  }

  static create (): void {
    const entity = entityManager.createEntity()
    entityManager.addComponent(new TransformComponent(Yard.getTransform(pixiApp)), entity)
    entityManager.addComponent(new SpriteComponent({ src: yardImage as string }), entity)
    entityManager.addComponent(new AnimalYardComponent(), entity)
  }
}
