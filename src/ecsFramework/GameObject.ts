import { type Entity } from './Entity'

export abstract class GameObject {
  create: (...params: any) => Entity
}
