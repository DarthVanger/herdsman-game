import { SpriteComponent } from '../components/SpriteComponent'
import { GameObject } from '../ecsFramework/GameObject'
import animalImage from '../../assets/cat.png'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { type PointData } from 'pixi.js'
import { MainHero } from './MainHero'
import { CaptureComponent } from '../components/CaptureComponent'
import { AnimalComponent } from '../components/AnimalComponent'

export class Animal extends GameObject {
  constructor ({ x, y }: PointData) {
    super()
    const width = pixiApp.renderer.width / 12
    const height = width * 1.8
    const followSpeed = 0.5 + Math.random()
    this.addComponent(new TransformComponent({ x, y, width, height, anchor: { x: 0.5, y: 0.5 } }))
    this.addComponent(new SpriteComponent({ src: animalImage as string, anchor: { x: 0.5, y: 0.5 } }))
    this.addComponent(new CaptureComponent({ targetTag: MainHero.tag, followSpeed }))
    this.addComponent(new AnimalComponent())
  }
}
