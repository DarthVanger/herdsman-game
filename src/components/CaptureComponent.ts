import { type Component } from '../ecsFramework/Component'

interface CaptureComponentParams {
  targetTag: string
  followSpeed: number
}

export class CaptureComponent implements Component {
  targetTag: string
  isCaptured: false
  followSpeed = 1.5

  constructor ({ targetTag, followSpeed }: CaptureComponentParams) {
    this.targetTag = targetTag
    this.followSpeed = followSpeed
  }
}
