import Vector from "./physics/vector.js"
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
    this.gradientFrequency = 100
    this.gradientIndex = Math.floor(Math.random() * this.colors.length) * this.gradientFrequency
    this.width = 0
    this.height = 0
  }

  resize(width, height) {
    this.width = width
    this.height = height
  }

  createInk() {
    const ink = new Ink()
    const colorIndex = Math.floor(this.gradientIndex / this.gradientFrequency) % this.colors.length
    ink.fgColor = this.colors[colorIndex]
    ink.circle.pos.x = this.width / 2 + (Math.random() - 0.5) * 20
    ink.circle.pos.y = this.height / 2 + (Math.random() - 0.5) * 20
    ink.circle.boundStart = new Vector(50, 50)
    ink.circle.boundEnd = new Vector(this.width - 50, this.height - 50)

    this.notifyFunc(ink, ink.circle)

    this.gradientIndex += 1
  }
}
