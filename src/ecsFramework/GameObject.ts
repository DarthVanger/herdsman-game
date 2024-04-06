import { type Component } from './Component'
import { type Entity } from './Entity'
import { entityManager } from './EntityManager'

export abstract class GameObject {
  entity: Entity = entityManager.createEntity()

  addComponent (component: Component): void {
    entityManager.addComponent(component, this.entity)
  }
}
