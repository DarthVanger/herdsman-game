import { type GameEventListener } from '../ecsFramework/gameEventBus'

export class GameEventListenerComponent<P> {
  isAdded = false
  eventName: string
  eventListener: GameEventListener

  constructor (eventName: string, eventListener: GameEventListener<P>) {
    this.eventName = eventName
    this.eventListener = eventListener
  }
}
