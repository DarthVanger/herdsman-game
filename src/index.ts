import { App } from './App'

const init = async (): Promise<void> => {
  const app = new App()
  await app.bootstrap()

  document.body.append(app.htmlElement)
}

init()
  .then(() => {
    console.info('index.ts init successful')
  })
  .catch(() => {
    throw new Error('Failed to init app')
  })
