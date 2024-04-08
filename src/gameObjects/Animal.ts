import { SpriteComponent } from '../components/SpriteComponent'
import { type GameObject } from '../ecsFramework/GameObject'
import animalImage from '../../assets/cat.png'
import { type Transform, TransformComponent } from '../components/TransformComponent'
import { pixiApp, getGameDimensions } from '../pixiApp'
import { MainHero } from './MainHero'
import { CollisionComponent } from '../components/CollisionComponent'
import { PatrolComponent } from '../components/PatrolComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type Entity } from '../ecsFramework/Entity'
import { FollowComponent } from '../components/FollowComponent'
import { type State, StateComponent } from '../components/StateComponent'
import { CaptureTargetComponent } from '../components/CaptureTargetComponent'
import { IsInsideAreaComponent } from '../components/IsInsideAreaComponent'
import { Yard } from './Yard'
import { GameEventEmitterComponent } from '../components/GameEventEmitterComponent'
import { GameEvent } from '../ecsFramework/gameEventBus'

export class Animal implements GameObject {
  static enteredYardEventName = 'animalEnteredYard'

  static getInitialTransform (): Transform {
    const height = getGameDimensions().diagonal / 20
    const width = height / 1.8
    return {
      x: 0,
      y: 0,
      width,
      height,
      anchor: { x: 0.5, y: 0.5 }
    }
  }

  static create (transform: Transform, patrolAreaEntity: Entity): Entity {
    const screenDiagonal = Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
    const mainHeroSpeed = MainHero.getSpeed(screenDiagonal)
    const speed = mainHeroSpeed / 2 + Math.random() * mainHeroSpeed / 2

    const entity = entityManager.createEntity()
    entityManager.addComponent(new TransformComponent(transform), entity)
    entityManager.addComponent(new SpriteComponent({ src: animalImage as string }), entity)
    // entityManager.addComponent(new CaptureComponent({ targetTag: MainHero.tag, followSpeed: speed }), entity)
    // entityManager.addComponent(new AnimalComponent(), entity)
    // entityManager.addComponent(new PatrolComponent({ speed, patrolAreaEntity }), entity)
    entityManager.addComponent(new StateComponent(new PatrolState(entity, patrolAreaEntity, speed)), entity)
    entityManager.addComponent(new GameEventEmitterComponent(), entity)

    return entity
  }
}

class PatrolState implements State {
  entity: Entity
  patrolAreaEntity: Entity
  speed: number

  constructor (entity: Entity, patrolAreaEntity: Entity, speed: number) {
    this.entity = entity
    this.patrolAreaEntity = patrolAreaEntity
    this.speed = speed
  }

  enter (): void {
    entityManager.addComponent(new PatrolComponent({ speed: this.speed, patrolAreaEntity: this.patrolAreaEntity }), this.entity)
    entityManager.addComponent(new CollisionComponent({ targetTag: MainHero.tag, onCollision: (entity: Entity) => { this.handleCollision(entity) } }), this.entity)
  }

  exit (): void {
    entityManager.removeComponentByClassName(CollisionComponent.name, this.entity)
    entityManager.removeComponentByClassName(PatrolComponent.name, this.entity)
  }

  private handleCollision (collisionEntity: Entity): void {
    const captureTargetComponent = entityManager.getComponentByClassName(CaptureTargetComponent.name, collisionEntity) as CaptureTargetComponent
    if (captureTargetComponent.groupSize < captureTargetComponent.maxGroupSize) {
      const stateComponent = entityManager.getComponentByClassName(StateComponent.name, this.entity) as StateComponent
      stateComponent.transitionToState = new FollowState(this.entity, MainHero.tag, this.speed)
      captureTargetComponent.groupSize++
    }
  }
}

class FollowState implements State {
  entity: Entity
  targetTag: string
  speed: number

  constructor (entity: Entity, targetTag: string, speed: number) {
    this.entity = entity
    this.targetTag = targetTag
    this.speed = speed
  }

  enter (): void {
    entityManager.addComponent(new IsInsideAreaComponent({ targetTag: Yard.tag, onEnter: () => { this.handleYardEnter() } }), this.entity)

    const targetEntities = entityManager.getAllEntitiesByTag(this.targetTag)
    for (const targetEntity of targetEntities) {
      entityManager.addComponent(new FollowComponent({ targetEntity, followSpeed: this.speed }), this.entity)
    }
  }

  exit (): void {
    const followComponent = entityManager.getComponentByClassName(FollowComponent.name, this.entity) as FollowComponent
    const captureTargetComponent = entityManager.getComponentByClassName(CaptureTargetComponent.name, followComponent.targetEntity) as CaptureTargetComponent
    entityManager.removeComponentByClassName(FollowComponent.name, this.entity)
    captureTargetComponent.groupSize--
  }

  private handleYardEnter (): void {
    const stateComponent = entityManager.getComponentByClassName(StateComponent.name, this.entity) as StateComponent
    stateComponent.transitionToState = new InTheYardState(this.entity)
  }
}

class InTheYardState implements State {
  entity: Entity

  constructor (entity: Entity) {
    this.entity = entity
  }

  enter (): void {
    const gameEventEmitterComponent = entityManager.getComponentByClassName(GameEventEmitterComponent.name, this.entity) as GameEventEmitterComponent
    gameEventEmitterComponent.eventQueue.push(new GameEvent(Animal.enteredYardEventName))

    entityManager.removeComponentByClassName(IsInsideAreaComponent.name, this.entity)
  }
}
