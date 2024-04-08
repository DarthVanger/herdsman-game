import { Text, type Ticker } from 'pixi.js'
import { pixiApp } from './pixiApp'
import { spawner } from './Spawner'
import { type System } from './ecsFramework/System'
import { MoveToClickPositionSystem } from './systems/MoveToClickPositionSystem'
import { CollisionSystem } from './systems/CollisionSystem'
import { FollowSystem } from './systems/FollowSystem'
import { PatrolSystem } from './systems/PatrolSystem'
import { StateSystem } from './systems/StateSystem'
import { IsInsideAreaSystem } from './systems/IsInsideAreaSystem'
import { GameEventListenerSystem } from './systems/GameEventListenerSystem'
import { GameEventEmitterSystem } from './systems/GameEventEmitterSystem'
import { gameAssets } from './GameAssets'
import { RenderSystem } from './systems/RenderSystem'

export class Game {
  htmlElement: HTMLElement
  systems: System[]

  async bootstrap (): Promise<void> {
    await pixiApp.init({ background: 'black', resizeTo: window })
    this.htmlElement = pixiApp.canvas
  }

  async start (): Promise<void> {
    this.systems = [
      new RenderSystem(),
      new GameEventListenerSystem(),
      new GameEventEmitterSystem(),
      new MoveToClickPositionSystem(),
      new CollisionSystem(),
      new FollowSystem(),
      new PatrolSystem(),
      new StateSystem(),
      new IsInsideAreaSystem()
    ]

    const loadingGraphics = new Text('Loading...', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' })
    pixiApp.stage.addChild(loadingGraphics)

    await gameAssets.preload()

    spawner.spawnGameField()
    spawner.spawnYard()
    spawner.spawnScore()
    spawner.spawnAnimalsWithRandomInterval()
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
