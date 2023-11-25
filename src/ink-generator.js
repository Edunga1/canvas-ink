import Ink from "./shapes/ink.js"

export default class InkGenerator {
  constructor(notifyFunc) {
    this.notifyFunc = notifyFunc
    this.colors = [
      '#ff0000',
      '#ff8000',
      '#ffff00',
      '#80ff00',
      '#00ff00',
      '#00ff80',
      '#00ffff',
      '#0080ff',
      '#0000ff',
      '#8000ff',
      '#ff00ff',
      '#ff0080',
    ]
    this.gradientFrequency = 200
    this.gradientIndex = Math.floor(Math.random() * this.colors.length) * this.gradientFrequency
  }

  createInk(x, y) {
    const ink = new Ink()
    const colorIndex = Math.floor(this.gradientIndex / this.gradientFrequency) % this.colors.length
    ink.fgColor = this.colors[colorIndex]
    ink.circle.pos.x = x / 2 + (Math.random() - 0.5) * 20
    ink.circle.pos.y = y / 2 + (Math.random() - 0.5) * 20
    this.notifyFunc(ink, ink.circle)

    this.gradientIndex += 1
  }
}
