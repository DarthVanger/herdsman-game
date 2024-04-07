/* eslint-disable no-new */
import { MainHero } from './gameObjects/MainHero'
import { Yard } from './gameObjects/Yard'

class Spawner {
  spawnMainCharacter (): void {
    new MainHero()
  }

  spawnYard (): void {
    new Yard()
  }
}

export const spawner = new Spawner()
