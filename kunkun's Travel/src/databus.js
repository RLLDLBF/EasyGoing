// @author: wyndam
// @email: only.night@qq.com

import Pool from './base/pool.js'

import BasketballPair from './runtime/basketballPair.js'
import ChickenPair from './runtime/chickenPair.js'
//import BarrierPair from './runtime/barrierPair.js'

window.RATIO = window.innerWidth / 288

window.px2dp = function(px) {
  return px * RATIO
}

let instance

export default class DataBus {

  constructor() {
    if (instance == null) {
      instance = this
    } else {
      return instance
    }

    // 从开始到现在的帧数
    this.frame = 0
    // 游戏是否在运行，是否需要更新
    this.running = true
    // 游戏是否结束
    this.gameOver = false
    // 障碍物显示队列
    this.barriers = []
    // 缓存对象池
    this.pool = new Pool()

    // 全局难度参数
    this.speed = 2 // 速度
    this.barrierGenFrame = 200 // 生成障碍物间隔帧数
  }

  /**
   * 从添加到绘制的障碍物列表中回收不显示的用于新障碍物的显示
   */
  recycleBarrier(barrier) {
    if (barrier != null) {

      barrier.visible = false
      let temp = this.barriers.shift()
      // this.barriers.shift()
      // let temp = barrier
      temp.visible = false
      this.barriers[0].left -= this.speed
      //根据速度显示障碍物左移
      //this.pool.put('barrier',temp)
      //this.pool.put('barrier', temp)
      
    }
  }

  /**
   * 从对象池中去除障碍物组合对象，没有的话就创建一个
   */
  generateBasketball(basketball,x,y){
    //console.log('generateBasketball')
    // this.speed *= 1.05
    
    let temp = new BasketballPair()
    temp.init(basketball, x, y)
    return temp

    // let barrier =  this.pool.get('barrier')

    // if(barrier!=null){
    //   barrier.init(basketball,x,y)
    //   return barrier
    // }
    // else {
    //   let temp =new BasketballPair()
    //   temp.init(basketball,x,y)
    //   return temp
    // }

  }

  generateChicken(chicken,x,y){
    this.speed *= 1.05
    let temp = new ChickenPair()
    temp.init(chicken, x, y)
    return temp
    // let barrier = this.pool.get('barrier')

    // if(barrier!=null){
    //   barrier.init(chicken,x,y)
    //   return barrier
    // }
    // else{
    //   let temp = new ChickenPair()
    //   temp.init(chicken,x,y)
    //   return temp
    // }
  }


  generateBarrier(barrierTop, barrierBottom, x, y, blank) {
    let barrier = this.pool.get('barrier')

    if (barrier != null) {
      barrier.init(barrierTop, barrierBottom, x, y, blank)
      return barrier
    } else {
      let temp = new BarrierPair()
      temp.init(barrierTop, barrierBottom, x, y, blank)
      return temp
    }
  }

}

window.databus = new DataBus()