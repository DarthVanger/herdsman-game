import { type PointData } from 'pixi.js'
import { type Transform } from '../components/TransformComponent'

export const isBoxInsideBox = (box: Transform, containerBox: Transform): boolean => {
  return (
    box.x - box.width * box.anchor.x > containerBox.x - containerBox.width * containerBox.anchor.x &&
    box.y - box.height * box.anchor.y > containerBox.y - containerBox.height * containerBox.anchor.y &&
    box.x + box.width * (1 - box.anchor.x) < containerBox.x + containerBox.width * (1 - containerBox.anchor.x) &&
    box.y + box.height * (1 - box.anchor.y) < containerBox.y + containerBox.height * (1 - containerBox.anchor.y)
  )
}

export const hasIntersection = (box1: Transform, box2: Transform): boolean => {
  return (
    box1.x + box1.width * (1 - box1.anchor.x) > box2.x - box2.width * box2.anchor.x &&
    box1.y + box1.height * (1 - box1.anchor.y) > box2.y - box2.height * box2.anchor.y &&
    box1.x - box1.width * box1.anchor.x < box2.x + box2.width * (1 - box2.anchor.x) &&
    box1.y - box1.height * box1.anchor.y < box2.y + box2.height * (1 - box2.anchor.y)
  )
}

export const getRandomPointInsideBox = (box: Transform, containerBox: Transform): PointData => {
  const leftEdge = containerBox.x * (1 - containerBox.anchor.x) + box.width * box.anchor.x
  const width = containerBox.width - box.width * (1 - box.anchor.x)
  const topEdge = containerBox.y * (1 - containerBox.anchor.y) + box.height * box.anchor.y
  const height = containerBox.height - box.height * (1 - box.anchor.y)

  return {
    x: leftEdge + Math.random() * width,
    y: topEdge + Math.random() * height
  }
}
