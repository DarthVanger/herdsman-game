import { type Entity } from './ecsFramework/Entity'
import { Animal } from './gameObjects/Animal'
import { GameField } from './gameObjects/GameField'
import { MainHero } from './gameObjects/MainHero'
import { Score } from './gameObjects/Score'
import { Yard } from './gameObjects/Yard'
import { getRandomPointInsideBox, hasIntersection } from './utils/geometry'

class Spawner {
  animalSpawnInterval: number
  gameFieldEntity: Entity

  spawnGameField (): void {
    this.gameFieldEntity = GameField.create()
  }

  spawnYard (): void {
    Yard.create()
  }

  spawnScore (): void {
    Score.create()
  }

  spawnMainCharacter (): void {
    MainHero.create(this.gameFieldEntity)
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
    const initialAnimalTransform = Animal.getInitialTransform()
    const initialGameFieldTransform = GameField.getInitialTransform()
    const randomPointOnGameField = getRandomPointInsideBox(initialAnimalTransform, initialGameFieldTransform)
    const animalTransform = {
      ...initialAnimalTransform,
      ...randomPointOnGameField
    }

    if (hasIntersection(animalTransform, Yard.getInitialTransform())) {
      this.spawnAnimal()
      return
    }

    Animal.create(animalTransform, this.gameFieldEntity)
  }
}

export const spawner = new Spawner()
