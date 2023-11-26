export default class Shape {
  constructor() {
    this.highlighted = false
  }

  isInside(pos) {
    throw new Error("Implement this.")
  }

  draw(ctx) {
    throw new Error("Implement this.")
  }
}
