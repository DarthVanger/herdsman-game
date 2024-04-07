/* eslint-disable no-new */
import { GameField } from './gameObjects/GameField'
import { MainHero } from './gameObjects/MainHero'
import { Yard } from './gameObjects/Yard'

class Spawner {
  spawnGameField (): void {
    new GameField()
  }

  spawnYard (): void {
    new Yard()
  }

  spawnMainCharacter (): void {
    new MainHero()
  }
}

export const spawner = new Spawner()
