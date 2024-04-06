import { Rectangle, type FederatedPointerEvent } from 'pixi.js'
import { type System } from '../ecsFramework/System'
import { pixiApp } from '../pixiApp'

export class MoveToClickPositionSystem implements System {
  update: (deltaTime: number) => void
  setup (): void {
    pixiApp.stage.eventMode = 'static'
    pixiApp.stage.cursor = 'pointer'
    pixiApp.stage.hitArea = new Rectangle(0, 0, window.innerWidth, window.innerHeight)

    pixiApp.stage.on('pointerdown', event => { this.handlePointerDown(event) })
  }

  handlePointerDown (event: FederatedPointerEvent): void {
    console.log('pointer down', event)
  }
}
