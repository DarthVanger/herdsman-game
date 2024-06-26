import mainHeroImage from '../assets/main-hero.png'
import animalImage from '../assets/cat.png'
import gameFieldImage from '../assets/ground-tile.jpeg'
import yardImage from '../assets/grass-tile.jpeg'
import { Assets, type Texture } from 'pixi.js'

export enum AssetAlias {
  MAIN_HERO = 'MAIN_HERO',
  ANIMAL = 'ANIMAL',
  GAME_FIELD = 'GAME_FIELD',
  YARD = 'YARD'
}

class AssetManager {
  textures: Record<string, Texture>

  assets = [
    {
      alias: AssetAlias.MAIN_HERO,
      src: mainHeroImage
    },
    {
      alias: AssetAlias.ANIMAL,
      src: animalImage
    },
    {
      alias: AssetAlias.GAME_FIELD,
      src: gameFieldImage
    },
    {
      alias: AssetAlias.YARD,
      src: yardImage
    }
  ]

  async preload (): Promise<void> {
    this.textures = await Assets.load<Record<string, Texture>>(this.assets)
  }
}

export const assetManager = new AssetManager()
