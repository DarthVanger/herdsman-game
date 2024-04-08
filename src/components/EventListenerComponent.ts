import { type EventListener } from '../utils/eventBus'

export class EventListenerComponent<P> {
  isAdded = false
  eventName: string
  eventListener: EventListener

  constructor (eventName: string, eventListener: EventListener<P>) {
    this.eventName = eventName
    this.eventListener = eventListener
  }
}
