import { type Sprite } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'

interface SpriteComponentParams {
  src: string
}

export class SpriteComponent implements Component {
  src: string
  sprite: Sprite

  constructor ({ src }: SpriteComponentParams) {
    this.src = src
  }
}
