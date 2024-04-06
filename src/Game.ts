import { Text } from 'pixi.js'
import { pixiApp } from './pixiApp'
import { SpriteSystem } from './systems/SpriteSystem'
import { spawner } from './Spawner'

export class Game {
  htmlElement: HTMLElement

  async bootstrap (): Promise<void> {
    await pixiApp.init({ background: 'black', resizeTo: window })
    this.htmlElement = pixiApp.canvas
  }

  async start (): Promise<void> {
    const systems = [new SpriteSystem()]

    const text = new Text('Loading...', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' })
    pixiApp.stage.addChild(text)

    spawner.spawnMainCharacter()

    await Promise.all(systems.map(async system => { await system.setup() }))
  }
}
