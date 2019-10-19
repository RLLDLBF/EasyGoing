// @author: wyndam
// @email: only.night@qq.com

import BarrierPair from './barrierPair.js'

export default class BarrierManager {

  constructor() {}

  /**
   * 根据帧数，间隔一段时间生成一个障碍物，并将其加入全局缓存中
   */
  generateBarriers(frame) {
    if (frame % databus.barrierGenFrame === 0) {
      let barrier = databus.generateBarrier('images/pipe_down.png', 'images/pipe_up.png',
        window.innerWidth, px2dp(-130) + Math.random() * px2dp(100), px2dp(130))

      databus.barriers.push(barrier)
    }
  }
  //仿照这个加入篮球和鸡

  draw(ctx) {
    for (let i = 0; i < databus.barriers.length; i++) {
      databus.barriers[i].draw(ctx)
    }
  }

  update() {
    for (let i = 0; i < databus.barriers.length; i++) {
      databus.barriers[i].update()
    }
  }

}