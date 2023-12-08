export default class Shape {
  constructor() {
    this.highlighted = false
  }

  // eslint-disable-next-line no-unused-vars
  isInside(_pos) {
    throw new Error("Implement this.")
  }

  interact() { /** do nothing */ }

  // eslint-disable-next-line no-unused-vars
  collideShape(_shape) {
    throw new Error("Implement this.")
  }

  // eslint-disable-next-line no-unused-vars
  draw(_ctx) {
    throw new Error("Implement this.")
  }
}
