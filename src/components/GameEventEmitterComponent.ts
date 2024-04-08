import { type Component } from '../ecsFramework/Component'
import { type GameEvent } from '../ecsFramework/gameEventBus'

export class GameEventEmitterComponent implements Component {
  eventQueue: Array<GameEvent<any>> = []
}
