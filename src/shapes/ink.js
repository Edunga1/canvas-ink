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
    this.color = new Color()
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
    const color = this.color.reversed
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    if (this.highlighted) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = '#000'
      ctx.setLineDash([15, 5])
      ctx.lineWidth = 3
      ctx.stroke()
    }
    ctx.closePath()
    ctx.fill()
  }

  /**
   * @param {Shape} shape
   * */
  collideShape(shape) {
    if (!(shape instanceof Ink)) {
      return
    }

    if (!this.circle.collideCircle(shape.circle)) {
      return
    }

    this.#mix(shape)
  }

  interact() {
    this.color.g = 255
    this.color.b = 255
    this.color.deepens()
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

  #mix(/** @type Ink */ ink) {
    // TODO: implement this
  }
}

class Color {
  constructor() {
    this.r = 0
    this.g = 0
    this.b = 0
    this.a = 0
  }

  get reversed() {
    const color = new Color()
    color.r = 255 - this.r
    color.g = 255 - this.g
    color.b = 255 - this.b
    color.a = this.a
    return color
  }

  deepens() {
    if (this.a == 0) {
      this.a = .1
    }
    this.a = Math.min(1, this.a * 1.1)
  }
}
