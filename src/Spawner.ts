/* eslint-disable no-new */
import { Animal } from './gameObjects/Animal'
import { GameField } from './gameObjects/GameField'
import { MainHero } from './gameObjects/MainHero'
import { Score } from './gameObjects/Score'
import { Yard } from './gameObjects/Yard'
import { pixiApp } from './pixiApp'
import { hasIntersection } from './utils/geometry'

class Spawner {
  animalSpawnInterval: number

  spawnGameField (): void {
    GameField.create()
  }

  spawnYard (): void {
    Yard.create()
  }

  spawnScore (): void {
    Score.create()
  }

  spawnMainCharacter (): void {
    MainHero.create()
  }

  spawnAnimalsWithRandomInterval (): void {
    this.spawnAnimals()
    this.animalSpawnInterval = Math.random() * 10 * 1000

    setTimeout(() => {
      this.spawnAnimalsWithRandomInterval()
    }, this.animalSpawnInterval)
  }

  private spawnAnimals (): void {
    const animalCount = Math.random() * 5
    for (let i = 0; i < animalCount; i++) {
      this.spawnAnimal()
    }
  }

  private spawnAnimal (): void {
    const x = GameField.getX(pixiApp) + Animal.getWidth(pixiApp) + Math.random() * (GameField.getWidth(pixiApp) - Animal.getWidth(pixiApp))
    const y = GameField.getY(pixiApp) + Animal.getHeight(pixiApp) + Math.random() * (GameField.getHeight(pixiApp) - Animal.getHeight(pixiApp))
    const animalTransform = {
      x,
      y,
      width: Animal.getWidth(pixiApp),
      height: Animal.getHeight(pixiApp),
      anchor: Animal.anchor
    }

    if (hasIntersection(animalTransform, Yard.getTransform(pixiApp))) {
      this.spawnAnimal()
      return
    }

    Animal.create({
      x,
      y
    })
  }
}

export const spawner = new Spawner()
