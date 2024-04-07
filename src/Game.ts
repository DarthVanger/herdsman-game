import { Text, type Ticker } from 'pixi.js'
import { pixiApp } from './pixiApp'
import { SpriteSystem } from './systems/SpriteSystem'
import { spawner } from './Spawner'
import { type System } from './ecsFramework/System'
import { MoveToClickPositionSystem } from './systems/MoveToClickPositionSystem'

export class Game {
  htmlElement: HTMLElement
  systems: System[]

  async bootstrap (): Promise<void> {
    await pixiApp.init({ background: 'black', resizeTo: window })
    this.htmlElement = pixiApp.canvas
  }

  async start (): Promise<void> {
    this.systems = [new SpriteSystem(), new MoveToClickPositionSystem()]

    const loadingGraphics = new Text('Loading...', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' })
    pixiApp.stage.addChild(loadingGraphics)

    spawner.spawnGameField()
    spawner.spawnYard()
    spawner.spawnAnimals()
    spawner.spawnMainCharacter()

    await Promise.all(this.systems.map(async system => { await system.setup?.() }))

    pixiApp.stage.removeChild(loadingGraphics)

    pixiApp.ticker.add(time => { this.gameLoop(time) })
  }

  gameLoop (time: Ticker): void {
    for (const system of this.systems) {
      system.update?.(time.deltaTime)
    }
  }
}
