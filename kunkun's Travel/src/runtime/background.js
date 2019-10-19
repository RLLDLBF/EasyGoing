// @author: wyndam
// @email: only.night@qq.com

import EvnItem from '../runtime/envItem.js'

//const BG_IMG_SRC = 'images/bg_day.png'
const BG_IMG_SRC = 'images/bg.png'
const BG_IMG_WIDTH = 288
const BG_IMG_HEIGHT = 512

export default class Background extends EvnItem {

  constructor() {
    super(BG_IMG_SRC, 0, 0, BG_IMG_WIDTH, BG_IMG_HEIGHT)

    this.left = 0
  }

  draw(ctx) {

    ctx.drawImage(
      this.img,
      this.x + this.left,
      this.y,
      window.innerWidth,
      window.innerHeight
    )

    // ctx.drawImage(
    //   this.img,
    //   this.x + window.innerWidth + this.left,
    //   this.y,
    //   window.innerWidth,
    //   window.innerHeight
    // )

  }

  update() {
    // super.update()

    // if (this.left <= -window.innerWidth) {
    //   this.left = 0
    // }
  }

}