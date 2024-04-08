import { FollowComponent } from '../../../components/FollowComponent'
import { FolloweeComponent } from '../../../components/FolloweeCompoent'
import { IsInsideAreaComponent } from '../../../components/IsInsideAreaComponent'
import { StateComponent, type State } from '../../../components/StateComponent'
import { type Entity } from '../../../ecsFramework/Entity'
import { entityManager } from '../../../ecsFramework/EntityManager'
import { yard } from '../../Yard'
import { InTheYardState } from './InTheYardState'

export class FollowState implements State {
  entity: Entity
  targetTag: string
  speed: number

  constructor (entity: Entity, targetTag: string, speed: number) {
    this.entity = entity
    this.targetTag = targetTag
    this.speed = speed
  }

  enter (): void {
    entityManager.addComponent(new IsInsideAreaComponent({ targetTag: yard.tag, onEnter: () => { this.handleYardEnter() } }), this.entity)

    const targetEntities = entityManager.getAllEntitiesByTag(this.targetTag)
    for (const targetEntity of targetEntities) {
      entityManager.addComponent(new FollowComponent({ targetEntity, followSpeed: this.speed }), this.entity)
    }
  }

  exit (): void {
    const followComponent = entityManager.getComponentByClassName(FollowComponent.name, this.entity) as FollowComponent
    entityManager.removeComponentByClassName(FollowComponent.name, this.entity)
    const followeeComponent = entityManager.getComponentByClassName(FolloweeComponent.name, followComponent.targetEntity) as FolloweeComponent
    followeeComponent.groupSize--
  }

  private handleYardEnter (): void {
    const stateComponent = entityManager.getComponentByClassName(StateComponent.name, this.entity) as StateComponent
    stateComponent.transitionToState = new InTheYardState(this.entity)
  }
}
