export const SCALE = 8

export class Renderer {
  constructor(engine, canvas) {
    this.engine = engine
    this.render = this.render.bind(this)
    this.ctx = canvas.getContext('2d')
    canvas.width = engine.size * SCALE
    canvas.height = engine.size * SCALE
  }

  stop() {
    this.render = () => {}
  }

  render() {
    const { engine, render, ctx } = this
    ctx.clearRect(0, 0, engine.size * SCALE, engine.size * SCALE)
    ctx.fillStyle = '#D00'
    // draw everything
    for (let y = 0; y < engine.size; y++) {
      for (let x = 0; x < engine.size; x++) {
        const v = engine.get(x, y)
        if (v > 0) {
          ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE)
        }
      }
    }
    const { x, y } = engine.reward
    ctx.fillStyle = '#0D0'
    ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE)
    requestAnimationFrame(render)
  }
}