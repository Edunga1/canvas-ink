import InkGenerator from "./ink-generator.js"

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    /** @type CanvasRenderingContext2D */
    this.context = this.canvas.getContext('2d')
    /** @type Shape[] */
    this.shapes = []
    /** @type Circle[] */
    this.bodies = []
    this.inkGenerator = new InkGenerator(this.addShape.bind(this))

    this.#initCanvas()
    this.#createInitialInks()
  }

  addShape(shape, body) {
    this.shapes.push(shape)
    this.bodies.push(body)
  }

  #initCanvas() {
    this.#resize()
    this.context.globalCompositeOperation = 'saturation'

    document.body.appendChild(this.canvas)

    window.addEventListener('resize', this.#resize.bind(this))

    requestAnimationFrame(this.#animate.bind(this))
  }

  #resize() {
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  #animate() {
    this.#updateBodies()
    this.#drawBackground()
    this.#drawInks()
    requestAnimationFrame(this.#animate.bind(this))
  }

  #updateBodies() {
    this.bodies.forEach(i => {
      const targets = [...this.bodies]
      targets.forEach(j => {
        i.collideCircle(j)
      })
    })
  }

  #drawBackground() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  #drawInks() {
    this.shapes.forEach(i => i.draw(this.context))
  }

  #createInitialInks() {
    for (let i = 0; i < 500; i++) {
      this.inkGenerator.createInk(this.width / 2, this.height / 2)
    }
  }
}

window.onload = () => {
  new App()
}
