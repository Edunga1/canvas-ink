import Vector from "./vector.js"

export default class Unit {
  constructor() {
    this.pos = new Vector(0, 0)
    /** @type Vector */
    this.boundStart = null
    /** @type Vector */
    this.boundEnd = null
    this.isFixed = false
    this.friction = .05
    this.elasticity = 1
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 1)
    this.accelerationScalar = .03
    this.mass = 50
  }

  get inverseMass() {
    return 1 / this.mass
  }

  _collideCircle() {
    throw new Error("Implement this.")
  }

  _limitBoundary() {}

  /**
   * @returns {boolean}
   * */
  collideCircle() {
    const collided = this._collideCircle(...arguments)
    this._limitBoundary()
    return collided
  }

  toString() {
    return `
    pos: ${this.pos.toString()}
    friction: ${this.friction}
    elasticity: ${this.elasticity}
    velocity: ${this.velocity.toString()}
    acceleration: ${this.acceleration.toString()}
    accelerationScalar: ${this.accelerationScalar}
    mass: ${this.mass}
    `
  }
}
