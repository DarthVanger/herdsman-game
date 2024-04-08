export class Event<Payload = never> {
  name: string
  payload?: Payload

  constructor (name: string, payload?: Payload) {
    this.name = name
    this.payload = payload
  }
}

export type EventListener<Payload = never> = (payload?: Payload) => void

class EventBus {
  listenersByEventName = new Map<string, Array<EventListener<any>>>()

  emit (event: Event<any>): void {
    console.log('emit event: ', event)
    const listeners = this.listenersByEventName.get(event.name)
    listeners?.forEach(listener => { listener(event?.payload) })
  }

  addEventListener (eventName: string, listener: EventListener): void {
    let listeners = this.listenersByEventName.get(eventName)

    if (listeners === undefined) {
      listeners = []
      this.listenersByEventName.set(eventName, listeners)
    }

    listeners.push(listener)
  }
}

export const eventBus = new EventBus()
