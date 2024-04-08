import { type Component } from '../ecsFramework/Component'
import { type Event } from '../utils/eventBus'

export class EventEmitterComponent implements Component {
  eventQueue: Array<Event<any>> = []
}
