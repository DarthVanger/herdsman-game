import { entityManager } from '../ecsFramework/EntityManager'
import { type System } from '../ecsFramework/System'
import { ScriptComponent } from '../components/ScriptComponent'

export class ScriptSystem implements System {
  async setup (): Promise<void> {
    const entities = entityManager.getAllEntitiesByComponentClassName(ScriptComponent.name)
    for (const entity of entities) {
      const scriptComponent = entityManager.getComponentByClassName(ScriptComponent.name, entity) as ScriptComponent
      await scriptComponent.script.setup?.()
    }
  }

  update (deltaTime: number): void {
    const entities = entityManager.getAllEntitiesByComponentClassName(ScriptComponent.name)
    for (const entity of entities) {
      const scriptComponent = entityManager.getComponentByClassName(ScriptComponent.name, entity) as ScriptComponent
      scriptComponent.script.update?.(deltaTime)
    }
  }
}
