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

  /**
   * @param {CanvasRenderingContext2D} ctx
   * */
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
    if (this.highlighted) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 10
      ctx.stroke()
    }
    ctx.closePath()
    ctx.fill()
  }

  isInside(/** @type Vector */ pos) {
    return this.circle.pos.distance(pos) < this.visibleRadius
  }

  getIntersects(
    /** @type Ink[] */ inks,
  ) {
    return inks.filter(i => {
      return i.circle.pos.distance(this.circle.pos) < this.visibleRadius + i.circle.radius
    })
  }
}
