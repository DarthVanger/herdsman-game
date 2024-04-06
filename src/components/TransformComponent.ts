import { type Component } from '../ecsFramework/Component'

export class TransformComponent implements Component {
  x: number
  y: number
  width: number
  height: number
  rotation: number

  constructor ({ x = 0, y = 0, width = 0, height = 0, rotation = 0 } = {}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.rotation = rotation
  }
}
