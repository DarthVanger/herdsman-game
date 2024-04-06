import { SpriteComponent } from '../components/SpriteComponent'
import { GameObject } from '../ecsFramework/GameObject'
import cowboyImage from '../../assets/cowboy.webp'

export class MainCharacter extends GameObject {
  constructor () {
    super()
    this.addComponent(new SpriteComponent(cowboyImage as string))
  }
}