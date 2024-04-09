import { type Container, Text, type Ticker } from 'pixi.js'
import { getGameDimensions, pixiApp } from './pixiApp'
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
import { assetManager } from './AssetManager'
import { RenderSystem } from './systems/RenderSystem'

export class Game {
  htmlElement: HTMLElement
  systems: System[]
  loader: Container

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

    this.showLoader()

    await assetManager.preload()

    this.removeLoader()

    spawner.spawnGameField()
    spawner.spawnYard()
    spawner.spawnScore()
    spawner.spawnAnimalsWithRandomInterval()
    spawner.spawnMainCharacter()

    await Promise.all(this.systems.map(async system => { await system.setup?.() }))

    pixiApp.ticker.add(time => { this.gameLoop(time) })
  }

  gameLoop (time: Ticker): void {
    for (const system of this.systems) {
      system.update?.(time.deltaTime)
    }
  }

  private showLoader (): void {
    this.loader = new Text(
      {
        text: 'Loading...',
        style: {
          fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
        }
      }
    )
    this.loader.x = getGameDimensions().width / 2 - this.loader.width / 2
    this.loader.y = getGameDimensions().height / 2 - this.loader.height / 2

    pixiApp.stage.addChild(this.loader)
  }

  private removeLoader (): void {
    pixiApp.stage.removeChild(this.loader)
  }
}
