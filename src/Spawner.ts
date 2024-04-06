/* eslint-disable no-new */
import { MainCharacter } from './gameObjects/MainCharacter'

class Spawner {
  spawnMainCharacter (): void {
    new MainCharacter()
  }
}

export const spawner = new Spawner()
