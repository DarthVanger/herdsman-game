export class GameEvent<Payload = never> {
  name: string
  payload?: Payload

  constructor (name: string, payload?: Payload) {
    this.name = name
    this.payload = payload
  }
}

export type GameEventListener<Payload = never> = (payload?: Payload) => void

class GameEventBus {
  listenersByEventName = new Map<string, Array<GameEventListener<any>>>()

  emit (event: GameEvent<any>): void {
    const listeners = this.listenersByEventName.get(event.name)
    listeners?.forEach(listener => { listener(event?.payload) })
  }

  addEventListener (eventName: string, listener: GameEventListener): void {
    let listeners = this.listenersByEventName.get(eventName)

    if (listeners === undefined) {
      listeners = []
      this.listenersByEventName.set(eventName, listeners)
    }

    listeners.push(listener)
  }
}

export const gameEventBus = new GameEventBus()
