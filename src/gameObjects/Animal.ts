import { SpriteComponent } from '../components/SpriteComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import animalImage from '../../assets/cat.png'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { type Application, type PointData } from 'pixi.js'
import { MainHero } from './MainHero'
import { CaptureComponent } from '../components/CaptureComponent'
import { AnimalComponent } from '../components/AnimalComponent'
import { PatrolComponent } from '../components/PatrolComponent'
import { entityManager } from '../ecsFramework/EntityManager'

export class Animal implements GameObject {
  static getWidth (pixiApp: Application): number {
    return Animal.getHeight(pixiApp) / 1.8
  }

  static getHeight (pixiApp: Application): number {
    return Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height) / 20
  }

  static anchor = { x: 0.5, y: 0.5 }

  static create ({ x, y }: PointData): void {
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const height = Animal.getHeight(pixiApp)
    const width = Animal.getWidth(pixiApp)
    const mainHeroSpeed = MainHero.getSpeed(screenDiagonal)
    const speed = mainHeroSpeed / 2 + Math.random() * mainHeroSpeed / 2

    const entity = entityManager.createEntity()
    entityManager.addComponent(new TransformComponent({ x, y, width, height, anchor: Animal.anchor }), entity)
    entityManager.addComponent(new SpriteComponent({ src: animalImage as string }), entity)
    entityManager.addComponent(new CaptureComponent({ targetTag: MainHero.tag, followSpeed: speed }), entity)
    entityManager.addComponent(new AnimalComponent(), entity)
    entityManager.addComponent(new PatrolComponent({ speed }), entity)
  }
}
