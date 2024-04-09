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
    entityManager.addComponent(
      new IsInsideAreaComponent({ targetTag: yard.tag, onEnter: () => { this.handleYardEnter() } }),
      this.entity
    )

    const targetEntities = entityManager.getAllEntitiesByTag(this.targetTag)
    for (const targetEntity of targetEntities) {
      entityManager.addComponent(new FollowComponent({ targetEntity, followSpeed: this.speed }), this.entity)
    }
  }

  exit (): void {
    const followComponent = entityManager.getComponentByClass(FollowComponent, this.entity)
    const followeeComponent = entityManager.getComponentByClass(FolloweeComponent, followComponent.targetEntity)

    followeeComponent.groupSize--

    entityManager.removeComponentByClassName(FollowComponent.name, this.entity)
    entityManager.removeComponentByClassName(IsInsideAreaComponent.name, this.entity)
  }

  private handleYardEnter (): void {
    const stateComponent = entityManager.getComponentByClass(StateComponent, this.entity)
    stateComponent.transitionToState = new InTheYardState(this.entity)
  }
}
