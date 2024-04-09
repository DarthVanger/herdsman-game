import { type CollisionComponent } from './components/CollisionComponent'
import { type FollowComponent } from './components/FollowComponent'
import { type FolloweeComponent } from './components/FolloweeCompoent'
import { type GameEventEmitterComponent } from './components/GameEventEmitterComponent'
import { type GameEventListenerComponent } from './components/GameEventListenerComponent'
import { type IsInsideAreaComponent } from './components/IsInsideAreaComponent'
import { type MoveToClickPositionComponent } from './components/MoveToClickPositionComponent'
import { type PatrolComponent } from './components/PatrolComponent'
import { type RenderComponent } from './components/RenderComponent'
import { type ScoreComponent } from './components/ScoreComponent'
import { type StateComponent } from './components/StateComponent'
import { type TransformComponent } from './components/TransformComponent'

/**
 * All component types should be added here for proper typing in EntityManager
 */
export type AllComponentTypesUnion =
  CollisionComponent |
  FollowComponent |
  FolloweeComponent |
  GameEventEmitterComponent |
  GameEventListenerComponent<any> |
  IsInsideAreaComponent |
  MoveToClickPositionComponent |
  PatrolComponent |
  RenderComponent |
  ScoreComponent |
  StateComponent |
  TransformComponent
