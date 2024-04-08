import { Application } from 'pixi.js'

export interface GameDimensions {
  width: number
  height: number
  diagonal: number
}

export const pixiApp = new Application()

export const getGameDimensions = (): GameDimensions => {
  return {
    width: pixiApp.renderer.width,
    height: pixiApp.renderer.height,
    diagonal: Math.hypot(pixiApp.renderer.width, pixiApp.renderer.height)
  }
}
