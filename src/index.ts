import './style.css'
import { Game } from './Game'

const init = async (): Promise<void> => {
  const game = new Game()
  await game.bootstrap()

  document.body.append(game.htmlElement)

  await game.start()
}

init()
  .then(() => {
    console.info('index.ts init successful')
  })
  .catch(() => {
    throw new Error('Failed to init game')
  })
