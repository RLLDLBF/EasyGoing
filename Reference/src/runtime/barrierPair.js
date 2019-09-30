// @author: wyndam
// @email: only.night@qq.com

import Sprite from '../base/sprite.js'
import Barrier from '../runtime/barrier.js'

const BARRIER_IMG_SRC = 'images/pipe_down.png'
const BARRIER_IMG1_SRC = 'images/pipe_up.png'
const BARRIER_WIDTH = 52
const BARRIER_HEIGHT = 320

export default class BarrierPair extends Sprite {

  constructor() {
    super(BARRIER_IMG_SRC, 0, 0, BARRIER_WIDTH, BARRIER_HEIGHT)

    this.width = px2dp(this.width) / 1.3
    this.height = px2dp(this.height) / 1.3
    //根据手机的分辨率从 px(像素) 的单位 转成为 dp

    this.left = 0
    this.blank = 100
    this.scored = false

    this.topBarrier = new Barrier()
    this.bottomBarrier = new Barrier()
  }

  init(barrierTopImg, barrierBottomImg, x, y, blank) {
    this.topBarrier.init(barrierTopImg, x, y, this.width, this.height)
    this.bottomBarrier.init(barrierBottomImg, x, y + this.topBarrier.height + blank, this.width, this.height)

    this.blank = blank
    this.visible = true
    this.scored = false
    this.left = 0
  }

  draw(ctx) {
    if (!this.visible) {
      return
    }

    this.topBarrier.draw(ctx)
    this.bottomBarrier.draw(ctx)
  }

  update() {
    if (!this.visible) {
      return
    }

    this.topBarrier.update()
    this.bottomBarrier.update()
  }

  /**
   * 分别对两个障碍物做碰撞检测即可
   */
  isCollideEdgeWith(target) {
    return (this.topBarrier.isCollideEdgeWith(target) || this.bottomBarrier.isCollideEdgeWith(target))
  }

  /**
   * 判断玩家是否越过了障碍物
   */
  isPassed(player) {
    if (this.scored) {
      return false
    }
    let score = (player.x > this.topBarrier.x + this.topBarrier.width)
    if (score) {
      this.scored = true
    }
    return score
  }

}