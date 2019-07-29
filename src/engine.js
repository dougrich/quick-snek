export const SIZE = 32
export const DIRECTION = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  LIST: [39,37,38,40]
}

export class Engine {
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
    if (v > 0) return this.populate()
    else return { x, y }
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