import { type Sprite, type PointData } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'

interface SpriteComponentParams {
  src: string
  anchor?: PointData
}

export class SpriteComponent implements Component {
  src: string
  anchor: PointData
  sprite: Sprite

  constructor ({ src, anchor }: SpriteComponentParams) {
    this.src = src
    this.anchor = anchor ?? { x: 0, y: 0 }
  }
}
