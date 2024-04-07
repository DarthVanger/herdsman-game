import { type Component } from '../ecsFramework/Component'

interface CaptureComponentParams {
  targetTag: string
}

export class CaptureComponent implements Component {
  targetTag: string
  isCaptured: false

  constructor ({ targetTag }: CaptureComponentParams) {
    this.targetTag = targetTag
  }
}
