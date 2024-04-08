import { type Sprite, type Container, type Text } from 'pixi.js'

export class RenderComponent<T extends Container = Container | Sprite | Text> {
  isAddedToStage = false
  pixiDisplayObject: T

  constructor (pixiDisplayObject: T) {
    this.pixiDisplayObject = pixiDisplayObject
  }
}
