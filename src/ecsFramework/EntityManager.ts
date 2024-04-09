import { type AllComponentTypesUnion } from '../AllComponentTypesUnion'
import { Entity } from './Entity'

type ComponentsMap = Map<Entity['id'], AllComponentTypesUnion>

class EntityManager {
  private lowestUnassignedEntityId = 1
  private readonly entities: Entity[] = []
  private readonly componentsByClassName = new Map<string, ComponentsMap>()
  private readonly entitiesByTag = new Map<string, Entity[]>()

  generateEntityId (): number {
    return this.lowestUnassignedEntityId++
  }

  createEntity (): Entity {
    const id = this.generateEntityId()
    const entity = new Entity(id)
    this.entities[id] = entity
    return entity
  }

  setEntityTag (tag: string, entity: Entity): void {
    let entitiesArray = this.entitiesByTag.get(tag)
    if (entitiesArray === undefined) {
      entitiesArray = []
      this.entitiesByTag.set(tag, entitiesArray)
    }
    entitiesArray.push(entity)
  }

  addComponent (component: AllComponentTypesUnion, entity: Entity): void {
    const componentClassName = component.constructor.name
    let componentsMap = this.componentsByClassName.get(componentClassName)
    if (componentsMap === undefined) {
      componentsMap = new Map()
      this.componentsByClassName.set(componentClassName, componentsMap)
    }
    componentsMap.set(entity.id, component)
  }

  removeComponentByClassName (componentClassName: string, entity: Entity): void {
    const componentsMap = this.componentsByClassName.get(componentClassName)
    componentsMap?.delete(entity.id)
  }

  /**
   * Get component by class itself, intead of class name,
   * to make it possible to have return type of the same class as the component.
   */
  getComponentByClass<T extends AllComponentTypesUnion> (componentClass: new(...args: any) => T, entity: Entity): T {
    const component = this.componentsByClassName.get(componentClass.name)?.get(entity.id) as T | undefined

    if (component === undefined) {
      throw new Error(
        `Entity has no component of class "${componentClass.name}". Use EntityManager.hasComponentClass() for branching.`
      )
    }

    return component
  }

  hasComponentClass (componentClass: new(...args: any) => AllComponentTypesUnion, entity: Entity): boolean {
    const component = this.componentsByClassName.get(componentClass.name)?.get(entity.id)
    return component !== undefined
  }

  getAllEntitiesByComponentClassName (componentClassName: string): Entity[] {
    const componentsMap = this.componentsByClassName.get(componentClassName)
    const entities = []
    if (componentsMap !== undefined) {
      for (const entityId of componentsMap.keys()) {
        entities.push(new Entity(entityId))
      }
    }

    return entities
  }

  getAllEntitiesByTag (tag: string): Entity[] {
    const entities = this.entitiesByTag.get(tag)
    return entities ?? []
  }
}

export const entityManager = new EntityManager()
