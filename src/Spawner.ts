import { type Entity } from './ecsFramework/Entity'
import { animal } from './gameObjects/Animal'
import { gameField } from './gameObjects/GameField'
import { mainHero } from './gameObjects/MainHero'
import { score } from './gameObjects/Score'
import { yard } from './gameObjects/Yard'
import { getRandomPointInsideBox, hasIntersection } from './utils/geometry'

class Spawner {
  animalSpawnInterval: number
  gameFieldEntity: Entity

  spawnGameField (): void {
    this.gameFieldEntity = gameField.create()
  }

  spawnYard (): void {
    yard.create()
  }

  spawnScore (): void {
    score.create()
  }

  spawnMainCharacter (): void {
    mainHero.create(this.gameFieldEntity)
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
    const initialAnimalTransform = animal.getInitialTransform()
    const initialGameFieldTransform = gameField.getInitialTransform()
    const randomPointOnGameField = getRandomPointInsideBox(initialAnimalTransform, initialGameFieldTransform)
    const animalTransform = {
      ...initialAnimalTransform,
      ...randomPointOnGameField
    }

    if (hasIntersection(animalTransform, yard.getInitialTransform())) {
      this.spawnAnimal()
      return
    }

    animal.create(animalTransform, this.gameFieldEntity)
  }
}

export const spawner = new Spawner()
