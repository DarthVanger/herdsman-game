export interface System {
  setup: () => Promise<void>
  update: (deltaTime: number) => void
}
