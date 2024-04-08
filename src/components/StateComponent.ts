export interface State {
  enter?: () => void
  exit?: () => void
  execute?: () => void
}

export class StateComponent {
  state?: State
  transitionToState?: State

  constructor (transitionToState: State) {
    this.transitionToState = transitionToState
  }
}
