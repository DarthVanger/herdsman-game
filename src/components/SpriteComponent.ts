import { type Sprite } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'

export class SpriteComponent implements Component {
  url: string
  sprite: Sprite

  constructor (url: string) {
    this.url = url
  }
}
