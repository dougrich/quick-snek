(function (cache, modules) {
  function require(i) { return cache[i] || get(i); }
  function get(i) {
    var exports = {}, module = {exports: exports};
    modules[i].call(exports, window, require, module, exports);
    return (cache[i] = module.exports);
  }
  var main = require(0);
  return main.__esModule ? main.default : main;
}([],[function (global, require, module, exports) {
// index.js
'use strict';
const { Engine, SIZE, DIRECTION } = require(1)
const { Renderer } = require(2)

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
},function (global, require, module, exports) {
// engine.js
'use strict';
const SIZE = 32
exports.SIZE = SIZE
const DIRECTION = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  LIST: [39,37,38,40]
}
exports.DIRECTION = DIRECTION

class Engine {
  constructor() {
    this.reset()
  }
  reset() {
    this.state = new Array(SIZE * SIZE).fill(0)
    this.size = SIZE
    this.direction = DIRECTION.RIGHT
    this.length = 2
    this.lost = false
    this.head = { x: 0, y: 0 }
    this.set(0, 0, this.length)
    this.tick = this.tick.bind(this)
    this.reward = this.populate()
  }
  get(x, y) {
    return this.state[y * SIZE + x]
  }
  set(x, y, v) {
    this.state[y * SIZE + x] = v
  }
  populate() {
    const x = Math.floor(Math.random() * SIZE)
    const y = Math.floor(Math.random() * SIZE)
    const v = this.get(x, y)
    if (v > 0) this.populate()
    return { x, y }
  }
  setDirection(d) {
    this.direction = d
  }
  tick() {
    // wind down all the counters
    for (let i = 0; i < this.state.length; i++) {
      if (this.state[i] > 0) {
        this.state[i] = this.state[i] - 1
      }
    }
    // get new head position
    const { x, y } = this.head
    const nextHead = {
      [DIRECTION.LEFT]: () => ({ x: x -1, y }),
      [DIRECTION.RIGHT]: () => ({ x: x+ 1, y }),
      [DIRECTION.UP]: () => ({ x, y: y - 1}),
      [DIRECTION.DOWN]: () => ({ x, y: y + 1 })
    }[this.direction]()
    // check if head out of bounds or if it is choking on tail
    if (nextHead.x < 0 || nextHead.x >= SIZE || nextHead.y < 0 || nextHead.y >= SIZE || this.get(nextHead.x, nextHead.y) > 0) {
      // lose condition
      this.lost = true
      return
    }

    if (nextHead.x === this.reward.x && nextHead.y === this.reward.y) {
      this.length++
      this.reward = this.populate()
    }

    // update head
    this.head = nextHead
    this.set(nextHead.x, nextHead.y, this.length)
  }
}
exports.Engine = Engine
},function (global, require, module, exports) {
// render.js
'use strict';
const SCALE = 8
exports.SCALE = SCALE

class Renderer {
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
exports.Renderer = Renderer
}]));