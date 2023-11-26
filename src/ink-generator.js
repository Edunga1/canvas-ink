import Vector from "./physics/vector.js"
import Ink from "./shapes/ink.js"

export default class InkGenerator {
  constructor(notifyFunc) {
    this.notifyFunc = notifyFunc
    this.width = 0
    this.height = 0
    this.inkRadius = 10
    this.inkVisibleRadius = 20
    this.inkAmount = 100
  }

  resize(width, height) {
    this.width = width
    this.height = height
    this.inkAmount = Math.floor(width * height / 700)
    this.inkRadius = Math.sqrt(width * height) / this.inkAmount * 20
    this.inkVisibleRadius = this.inkRadius * 1.5
  }

  createMassInk() {
    for (let i = 0; i < this.inkAmount; i++) {
      this.createInk()
    }
  }

  createInk() {
    const ink = new Ink()
    ink.circle.radius = this.inkRadius
    ink.visibleRadius = this.inkVisibleRadius
    ink.circle.pos.x = this.width / 2 + (Math.random() - 0.5) * 20
    ink.circle.pos.y = this.height / 2 + (Math.random() - 0.5) * 20
    ink.circle.boundStart = new Vector(-this.width / 10, -this.height / 10)
    ink.circle.boundEnd = new Vector(this.width + this.width / 10, this.height + this.height / 10)

    this.notifyFunc(ink)
  }
}
