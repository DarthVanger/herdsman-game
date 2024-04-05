import { Application as PixiApplication } from 'pixi.js'

export class Game {
  pixiApp: PixiApplication
  htmlElement: HTMLElement

  async bootstrap (): Promise<void> {
    this.pixiApp = new PixiApplication()
    await this.pixiApp.init({ background: 'black', resizeTo: window })
    this.htmlElement = this.pixiApp.canvas
  }
}
