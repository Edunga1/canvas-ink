import Ink from "./shapes/ink.js"

export default class InkGenerator {
  constructor(notifyFunc) {
    this.notifyFunc = notifyFunc
  }

  createInk(x, y) {
    const ink = new Ink()
    ink.circle.pos.x = x / 2 + (Math.random() - 0.5) * 20
    ink.circle.pos.y = y / 2 + (Math.random() - 0.5) * 20
    this.notifyFunc(ink, ink.circle)
  }
}
