interface FolloweeComponentParams {
  maxGroupSize: number
}
export class FolloweeComponent {
  groupSize = 0
  maxGroupSize: number

  constructor ({ maxGroupSize }: FolloweeComponentParams) {
    this.maxGroupSize = maxGroupSize
  }
}
