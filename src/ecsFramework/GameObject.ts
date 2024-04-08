import { type Entity } from './Entity'

export abstract class GameObject {
  static create: (...params: any) => Entity
}
