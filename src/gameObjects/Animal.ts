import { SpriteComponent } from '../components/SpriteComponent'
import { GameObject } from '../ecsFramework/GameObject'
import animalImage from '../../assets/cat.png'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { type Application, type PointData } from 'pixi.js'
import { MainHero } from './MainHero'
import { CaptureComponent } from '../components/CaptureComponent'
import { AnimalComponent } from '../components/AnimalComponent'
import { PatrolComponent } from '../components/PatrolComponent'

export class Animal extends GameObject {
  static getWidth (pixiApp: Application): number {
    return Animal.getHeight(pixiApp) / 1.8
  }

  static getHeight (pixiApp: Application): number {
    return Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height) / 20
  }

  static anchor = { x: 0.5, y: 0.5 }

  constructor ({ x, y }: PointData) {
    super()
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const height = Animal.getHeight(pixiApp)
    const width = Animal.getWidth(pixiApp)
    const mainHeroSpeed = MainHero.getSpeed(screenDiagonal)
    const speed = mainHeroSpeed / 2 + Math.random() * mainHeroSpeed / 2
    this.addComponent(new TransformComponent({ x, y, width, height, anchor: Animal.anchor }))
    this.addComponent(new SpriteComponent({ src: animalImage as string }))
    this.addComponent(new CaptureComponent({ targetTag: MainHero.tag, followSpeed: speed }))
    this.addComponent(new AnimalComponent())
    this.addComponent(new PatrolComponent({ speed }))
  }
}
