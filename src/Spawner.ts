/* eslint-disable no-new */
import { Animal } from './gameObjects/Animal'
import { GameField } from './gameObjects/GameField'
import { MainHero } from './gameObjects/MainHero'
import { Score } from './gameObjects/Score'
import { Yard } from './gameObjects/Yard'
import { pixiApp } from './pixiApp'

class Spawner {
  spawnGameField (): void {
    new GameField()
  }

  spawnYard (): void {
    new Yard()
  }

  spawnScore (): void {
    new Score()
  }

  spawnMainCharacter (): void {
    new MainHero()
  }

  spawnAnimals (): void {
    const animalCount = 5 + Math.random() * 20
    for (let i = 0; i < animalCount; i++) {
      new Animal({
        x: GameField.getX(pixiApp) + Math.random() * GameField.getWidth(pixiApp),
        y: GameField.getY(pixiApp) + Math.random() * GameField.getHeight(pixiApp)
      })
    }
  }
}

export const spawner = new Spawner()
