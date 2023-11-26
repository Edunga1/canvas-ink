import Unit from "../physics/unit.js"

export default class Circle extends Unit {
  constructor() {
    super()
    this.radius = 5
  }

  /**
   * @param {Circle} circle
   */
  _collideCircle(circle) {
    if (circle == this) return false
    if (this.isFixed) return false
    if (!this.#intersectsCircle(circle)) return false

    this.#penetrationResolutionCircle(circle)
    this.#collideResolutionCircle(circle)
    return true
  }

  _limitBoundary() {
    if (this.isFixed) return

    if (this.boundStart && this.pos.x - this.radius < this.boundStart.x) {
      this.pos.x = this.boundStart.x + this.radius
      this.velocity.x *= -this.elasticity
    }
    if (this.boundEnd && this.pos.x + this.radius > this.boundEnd.x) {
      this.pos.x = this.boundEnd.x - this.radius
      this.velocity.x *= -this.elasticity
    }
    if (this.boundStart && this.pos.y - this.radius < this.boundStart.y) {
      this.pos.y = this.boundStart.y + this.radius
      this.velocity.y *= -this.elasticity
    }
    if (this.boundEnd && this.pos.y + this.radius > this.boundEnd.y) {
      this.pos.y = this.boundEnd.y - this.radius
      this.velocity.y *= -this.elasticity
    }
  }

  #intersectsCircle(
    /** @type Circle */
    circle,
  ) {
    return this.radius + circle.radius >= circle.pos.subtr(this.pos).mag()
  }

  #penetrationResolutionCircle(
    /** @type Circle */
    circle,
  ) {
    const dist = this.pos.subtr(circle.pos)
    // penetration depth
    const depth = this.radius + circle.radius - dist.mag()
    const penetrationRes = dist.unit().multiply(depth / (this.inverseMass + circle.inverseMass))
    this.pos = this.pos.add(penetrationRes.multiply(this.inverseMass))
  }

  #collideResolutionCircle(
    /** @type Unit */
    unit,
  ) {
    const normal = this.pos.subtr(unit.pos).unit()
    const relativeVelocity = this.velocity.subtr(unit.velocity)
    const separatingVelocity = relativeVelocity.dot(normal)
    const newSepVel = -separatingVelocity * Math.min(this.elasticity, unit.elasticity)

    const vsepDiff = newSepVel - separatingVelocity

    const impulse = vsepDiff / (this.inverseMass + unit.inverseMass)
    const impulseVector = normal.multiply(impulse)

    this.velocity = this.velocity.add(impulseVector.multiply(this.inverseMass))
  }
}
