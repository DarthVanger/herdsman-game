/* eslint-disable no-new */
import { MainHero } from './gameObjects/MainHero'

class Spawner {
  spawnMainCharacter (): void {
    new MainHero()
  }
}

export const spawner = new Spawner()
