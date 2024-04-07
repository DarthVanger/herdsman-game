import { SpriteComponent } from '../components/SpriteComponent'
import { GameObject } from '../ecsFramework/GameObject'
import animalImage from '../../assets/cat.png'
import { TransformComponent } from '../components/TransformComponent'
import { pixiApp } from '../pixiApp'
import { type PointData } from 'pixi.js'

export class Animal extends GameObject {
  constructor ({ x, y }: PointData) {
    super()
    const width = pixiApp.renderer.width / 8
    const height = width * 1.3
    this.addComponent(new TransformComponent({ x, y, width, height }))
    this.addComponent(new SpriteComponent({ src: animalImage as string, anchor: { x: 0.5, y: 0.5 } }))
  }
}
