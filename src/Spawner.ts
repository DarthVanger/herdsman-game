/* eslint-disable no-new */
import { Animal } from './gameObjects/Animal'
import { GameField } from './gameObjects/GameField'
import { MainHero } from './gameObjects/MainHero'
import { Score } from './gameObjects/Score'
import { Yard } from './gameObjects/Yard'
import { pixiApp } from './pixiApp'
import { hasIntersection } from './utils/geometry'

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

    new Animal({
      x,
      y
    })
  }
}

export const spawner = new Spawner()
