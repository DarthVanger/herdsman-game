import { SpriteComponent } from '../components/SpriteComponent'
import { GameObject } from '../ecsFramework/GameObject'
import animalImage from '../../assets/cat.png'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { type PointData } from 'pixi.js'
import { MainHero } from './MainHero'
import { CaptureComponent } from '../components/CaptureComponent'
import { AnimalComponent } from '../components/AnimalComponent'
import { PatrolComponent } from '../components/PatrolComponent'

export class Animal extends GameObject {
  constructor ({ x, y }: PointData) {
    super()
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const height = screenDiagonal / 20
    const width = height / 1.8
    const mainHeroSpeed = MainHero.getSpeed(screenDiagonal)
    const speed = mainHeroSpeed / 2 + Math.random() * mainHeroSpeed / 2
    this.addComponent(new TransformComponent({ x, y, width, height, anchor: { x: 0.5, y: 0.5 } }))
    this.addComponent(new SpriteComponent({ src: animalImage as string, anchor: { x: 0.5, y: 0.5 } }))
    this.addComponent(new CaptureComponent({ targetTag: MainHero.tag, followSpeed: speed }))
    this.addComponent(new AnimalComponent())
    this.addComponent(new PatrolComponent({ speed }))
  }
}
