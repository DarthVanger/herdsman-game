import { type Sprite } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'
import { type AssetAlias } from '../AssetManager'

export class SpriteComponent implements Component {
  assetAlias: AssetAlias
  pixiSprite: Sprite

  constructor (assetAlias: AssetAlias) {
    this.assetAlias = assetAlias
  }
}
