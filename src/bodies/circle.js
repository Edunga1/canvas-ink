import Unit from "../physics/unit.js"

export default class Circle extends Unit {
  constructor() {
    super()
    this.radius = 5
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

  /**
   * @param {Circle} circle
   */
  collideCircle(circle) {
    if (circle == this) return
    if (this.isFixed) return
    if (!this.#intersectsCircle(circle)) return

    this.#penetrationResolutionCircle(circle)
    this.#collideResolutionCircle(circle)
  }
}
