export interface System {
  setup?: (() => Promise<void>) | (() => void)
  update?: (deltaTime: number) => void
}
