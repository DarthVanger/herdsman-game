import { type TransformComponent } from '../components/TransformComponent'

export const isBoxInsideBox = (box: TransformComponent, containerBox: TransformComponent): boolean => {
  return (
    box.x - box.width * box.anchor.x > containerBox.x - containerBox.width * containerBox.anchor.x &&
    box.y - box.height * box.anchor.y > containerBox.y - containerBox.height * containerBox.anchor.y &&
    box.x + box.width * (1 - box.anchor.x) < containerBox.x + containerBox.width * (1 - containerBox.anchor.x) &&
    box.y + box.height * (1 - box.anchor.y) < containerBox.y + containerBox.height * (1 - containerBox.anchor.y)
  )
}
