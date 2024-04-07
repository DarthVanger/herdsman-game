import { type Text, type TextStyle } from 'pixi.js'

interface TextComponentParams {
  text: string
  style: Partial<TextStyle>
}

export class TextComponent {
  text: string
  style: Partial<TextStyle>
  pixiText: Text

  constructor ({ text, style }: TextComponentParams) {
    this.text = text
    this.style = style
  }
}
