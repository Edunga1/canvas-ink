import InkGenerator from "./ink-generator.js"
import Vector from "./physics/vector.js"
import Shape from "./shapes/shape.js" // eslint-disable-line no-unused-vars

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    /** @type CanvasRenderingContext2D */
    this.context = this.canvas.getContext('2d')
    /** @type Shape[] */
    this.shapes = []
    /** @type Circle[] */
    this.bodies = []
    this.inkGenerator = new InkGenerator(this.#addShape.bind(this))

    this.#initCanvas()
    this.#createInitialInks()
  }

  animate() {
    this.#update()
    this.#drawBackground()
    this.#drawInks()
  }

  /**
   * @param {number} x
   * @param {number} y
   * */
  enableHighlight(x, y) {
    const inks = this.#getInks(x, y)
    inks.true.forEach(i => i.highlighted = true)
    inks.false.forEach(i => i.highlighted = false)
  }

  /**
   * @param {number} x
   * @param {number} y
   * */
  colorInks(x, y) {
    const targets = this.#getInks(x, y).true
    const spreadTargets = [...targets]
    let lastTargets = [...targets]
    for (let depth = 0; depth < 3; depth++) {
      const newTargets = lastTargets.reduce((acc, i) => {
        return acc.concat(i.getIntersects(this.shapes))
      }, [])
      spreadTargets.push(...newTargets)
      lastTargets = newTargets
    }
    spreadTargets.forEach(i => i.fgColor = 'black')
    // TODO: refactor alhgorithm. very slow.
  }

  #addShape(shape, body) {
    this.shapes.push(shape)
    this.bodies.push(body)
  }

  #initCanvas() {
    this.#resize()
    this.context.globalCompositeOperation = 'saturation'

    document.body.appendChild(this.canvas)

    window.addEventListener('resize', this.#resize.bind(this))
  }

  #resize() {
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.inkGenerator.resize(this.width, this.height)
  }

  #update() {
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
    for (let i = 0; i < 400; i++) {
      this.inkGenerator.createInk()
    }
    for (let i = 0; i < 100; i++) {
      this.#update()
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {{true: Shape[], false: Shape[]}}
   * */
  #getInks(x, y) {
    const pos = new Vector(x, y)
    return this.shapes.reduce((acc, i) => {
      acc[i.isInside(pos)].push(i)
      return acc
    }, {true: [], false: []}
    )
  }
}

window.onload = () => {
  const app = new App()
  requestAnimationFrame(function tick() {
    app.animate()
    requestAnimationFrame(tick)
  })

  window.addEventListener('mousemove', e => {
    app.enableHighlight(e.clientX, e.clientY)
  })

  window.addEventListener('click', e => {
    app.colorInks(e.clientX, e.clientY)
  })
}
