import { type System } from '../ecsFramework/System'

export class ScriptComponent {
  script: System

  constructor (script: System) {
    this.script = script
  }
}
