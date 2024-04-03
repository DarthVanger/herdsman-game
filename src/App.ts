export class App {
  htmlElement: HTMLElement

  async bootstrap (): Promise<void> {
    this.htmlElement = document.createElement('h1')
    this.htmlElement.innerHTML = 'App works'
  }
}
