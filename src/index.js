import { Engine, SIZE, DIRECTION } from './engine'
import { Renderer } from './render'

window.onload = () => {
  const canvas = document.createElement('canvas')
  const engine = new Engine()
  const renderer = new Renderer(engine, canvas)
  document.body.appendChild(canvas)
  document.body.onkeydown = (ev) => {
    if (DIRECTION.LIST.includes(ev.keyCode)) {
      engine.setDirection(ev.keyCode)
    } else if (ev.keyCode === 13 && engine.lost) {
      engine.reset()
    } else {
      console.log(ev.keyCode)
    }
  }
  setTimeout(function () {
    requestAnimationFrame(renderer.render)
    setInterval(() => {
      if (!engine.lost) {
        engine.tick()
      }
    }, 100)
  })
}