import { type TransformComponent } from '../components/TransformComponent'

export const isBoxInsideBox = (box: TransformComponent, containerBox: TransformComponent): boolean => {
  return (
    box.x - box.width * box.anchor.x > containerBox.x - containerBox.width * containerBox.anchor.x &&
    box.y - box.height * box.anchor.y > containerBox.y - containerBox.height * containerBox.anchor.y &&
    box.x + box.width * (1 - box.anchor.x) < containerBox.x + containerBox.width * (1 - containerBox.anchor.x) &&
    box.y + box.height * (1 - box.anchor.y) < containerBox.y + containerBox.height * (1 - containerBox.anchor.y)
  )
}

export const hasIntersection = (box1: TransformComponent, box2: TransformComponent): boolean => {
  return (
    box1.x + box1.width * (1 - box1.anchor.x) > box2.x - box2.width * box2.anchor.x &&
    box1.y + box1.height * (1 - box1.anchor.y) > box2.y - box2.height * box2.anchor.y &&
    box1.x - box1.width * box1.anchor.x < box2.x + box2.width * (1 - box2.anchor.x) &&
    box1.y - box1.height * box1.anchor.y < box2.y + box2.height * (1 - box2.anchor.y)
  )
}
