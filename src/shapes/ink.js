import Circle from "../bodies/circle.js"
import Vector from "../physics/vector.js"
import Shape from "../shapes/shape.js"

export default class Ink extends Shape {
  constructor() {
    super()
    this.circle = new Circle()
    this.circle.radius = 60
    this.circle.elasticity = .01
    this.circle.velocity = new Vector(0, .5)
    this.circle.mass = 1
    this.circle.friction = .15
    this.visibleRadius = 75
    this.fgColor = '#FFF'
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(
      this.circle.pos.x,
      this.circle.pos.y,
      this.visibleRadius,
      0,
      2 * Math.PI
    )
    ctx.fillStyle = this.fgColor
    ctx.closePath()
    ctx.fill()
  }
}

