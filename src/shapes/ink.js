import Circle from "../bodies/circle.js"
import Vector from "../physics/vector.js"
import Shape from "../shapes/shape.js"

export default class Ink extends Shape {
  constructor() {
    super()
    this.circle = new Circle()
    this.circle.radius = 50
    this.circle.elasticity = .01
    this.circle.velocity = new Vector(0, .5)
    this.circle.mass = 1
    this.circle.friction = .15
    this.exaggeration = 1.5
    this.fgColor = '#FFF'
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(
      this.circle.pos.x,
      this.circle.pos.y,
      this.circle.radius * this.exaggeration,
      0,
      2 * Math.PI
    )
    ctx.fillStyle = this.fgColor
    ctx.closePath()
    ctx.fill()
  }

  toString() {
    return this.circle.toString()
  }
}

