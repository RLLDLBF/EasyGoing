// @author: wyndam
// @email: only.night@qq.com

import Sprite from '../base/sprite.js'

const __ = {
  speed: Symbol('speed')
}

export default class EnvItem extends Sprite {

  constructor(imgSrc, x, y, width, height) {
    super(imgSrc, x, y, width, height)
    this.left = 0
    // this[__.speed] = 2
    this[__.speed] = databus.speed
  }

  update() {
    if(!this.visible){
      return
    }
    this.left -= this[__.speed]
  }

  setSpeed(speed){
    this[__.speed] = speed
  }

}