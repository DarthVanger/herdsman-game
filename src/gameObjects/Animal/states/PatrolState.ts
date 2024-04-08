import { CollisionComponent } from '../../../components/CollisionComponent'
import { FolloweeComponent } from '../../../components/FolloweeCompoent'
import { PatrolComponent } from '../../../components/PatrolComponent'
import { type State, StateComponent } from '../../../components/StateComponent'
import { type Entity } from '../../../ecsFramework/Entity'
import { entityManager } from '../../../ecsFramework/EntityManager'
import { mainHero } from '../../MainHero'
import { yard } from '../../Yard'
import { FollowState } from './FollowState'

export class PatrolState implements State {
  entity: Entity
  patrolAreaEntity: Entity
  speed: number

  constructor (entity: Entity, patrolAreaEntity: Entity, speed: number) {
    this.entity = entity
    this.patrolAreaEntity = patrolAreaEntity
    this.speed = speed
  }

  enter (): void {
    entityManager.addComponent(
      new PatrolComponent({ speed: this.speed, patrolAreaEntity: this.patrolAreaEntity, forbiddenAreasTag: yard.tag }),
      this.entity
    )

    entityManager.addComponent(
      new CollisionComponent({
        targetTag: mainHero.tag,
        onCollision: (entity: Entity) => { this.handleCollisionWithMainHero(entity) }
      }),
      this.entity
    )
  }

  exit (): void {
    entityManager.removeComponentByClassName(CollisionComponent.name, this.entity)
    entityManager.removeComponentByClassName(PatrolComponent.name, this.entity)
  }

  private handleCollisionWithMainHero (collisionEntity: Entity): void {
    const followeeComponent = entityManager.getComponentByClassName(FolloweeComponent.name, collisionEntity) as FolloweeComponent
    if (followeeComponent.groupSize < followeeComponent.maxGroupSize) {
      const stateComponent = entityManager.getComponentByClassName(StateComponent.name, this.entity) as StateComponent
      stateComponent.transitionToState = new FollowState(this.entity, mainHero.tag, this.speed)
      followeeComponent.groupSize++
    }
  }
}
