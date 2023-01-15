import Circle from "../bodies/circle.js"
import Vector from "../physics/vector.js"
import Shape from "../shapes/shape.js"

export default class Ink extends Shape {
  constructor() {
    super()
    this.circle = new Circle()
    this.circle.radius = 30
    this.circle.elasticity = .01
    this.circle.velocity = new Vector(0, .5)
    this.circle.mass = 1
    this.circle.friction = .15
    this.exaggeration = 1
    /** @type Cream */
    this.next = null
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
    ctx.strokeStyle = "#FFF"
    ctx.fillStyle = "#FFF"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.closePath()
    ctx.fill()

    const next = this.next?.circle ?? this.circle
    const direction = next.pos.subtr(this.circle.pos).unit().multiply(5)
    ctx.beginPath()
    ctx.moveTo(this.circle.pos.x, this.circle.pos.y)
    ctx.lineTo(this.circle.pos.x + direction.x, this.circle.pos.y + direction.y)
    ctx.strokeStyle = "#CCC"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.closePath()
  }

  toString() {
    return this.circle.toString()
  }
}
