import { TransformComponent } from '../components/TransformComponent'
import { type Component } from './Component'
import { type Entity } from './Entity'
import { entityManager } from './EntityManager'

export abstract class GameObject {
  entity: Entity = entityManager.createEntity()

  constructor () {
    this.addComponent(TransformComponent)
  }

  addComponent (component: Component): void {
    entityManager.addComponent(component, this.entity)
  }
}
