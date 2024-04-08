import { type PointData } from 'pixi.js'
import { type Component } from '../ecsFramework/Component'

export interface Transform {
  x: number
  y: number
  width: number
  height: number
  anchor: PointData
}

export class TransformComponent implements Component, Transform {
  x: number
  y: number
  width: number
  height: number
  anchor: PointData

  constructor ({ x = 0, y = 0, width = 0, height = 0, anchor = { x: 0, y: 0 } } = {}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.anchor = anchor
  }
}
