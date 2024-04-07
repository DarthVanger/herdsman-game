import { CaptureTargetComponent } from '../CaptureTargetComponent'
import { AnimalComponent } from '../components/AnimalComponent'
import { AnimalYardComponent } from '../components/AnimalYardComponent'
import { FollowComponent } from '../components/FollowComponent'
import { ScoreComponent } from '../components/ScoreComponent'
import { TransformComponent } from '../components/TransformComponent'
import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { isBoxInsideBox } from '../utils/geometry'

export class AnimalYardSystem implements System {
  update (): void {
    const animalYardEntities = entityManager.getAllEntitiesByComponentClassName(AnimalYardComponent.name)
    const animalEntities = entityManager.getAllEntitiesByComponentClassName(AnimalComponent.name)

    for (const animalYardEntity of animalYardEntities) {
      for (const animalEntity of animalEntities) {
        const animalYardTransformComponent = entityManager.getComponentByClassName(TransformComponent.name, animalYardEntity) as TransformComponent
        const animalTransformComponent = entityManager.getComponentByClassName(TransformComponent.name, animalEntity) as TransformComponent
        const followComponent = entityManager.getComponentByClassName(FollowComponent.name, animalEntity) as FollowComponent

        if (isBoxInsideBox(animalTransformComponent, animalYardTransformComponent) && followComponent !== undefined) {
          const captureTargetComponent = entityManager.getComponentByClassName(CaptureTargetComponent.name, followComponent.targetEntity) as CaptureTargetComponent

          const scoreEntities = entityManager.getAllEntitiesByComponentClassName(ScoreComponent.name)
          for (const scoreEntity of scoreEntities) {
            const scoreComponent = entityManager.getComponentByClassName(ScoreComponent.name, scoreEntity) as ScoreComponent
            scoreComponent.value++
          }

          entityManager.removeComponentByClassName(FollowComponent.name, animalEntity)
          captureTargetComponent.groupSize--
        }
      }
    }
  }
}
