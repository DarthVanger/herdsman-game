/* eslint-disable no-new */
import { Animal } from './gameObjects/Animal'
import { GameField } from './gameObjects/GameField'
import { MainHero } from './gameObjects/MainHero'
import { Yard } from './gameObjects/Yard'
import { pixiApp } from './pixiApp'

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

  spawnAnimals (): void {
    const animalCount = 20
    for (let i = 0; i < animalCount; i++) {
      new Animal({
        x: Math.random() * pixiApp.renderer.width,
        y: Math.random() * pixiApp.renderer.height
      })
    }
  }
}

export const spawner = new Spawner()
