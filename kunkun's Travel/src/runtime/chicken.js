import EvnItem from '../runtime/envItem.js'

const CHICKEN_IMG_SRC =  'images/chicken.png'

const CHICKEN_WIDTH = 70
const CHICKEN_HEIGHT = 70

export default class Chicken extends EvnItem{
  constructor(){
    super(CHICKEN_IMG_SRC,0,0,CHICKEN_WIDTH,CHICKEN_HEIGHT)

    this.left = 0
  }

  init(imgSrc, x, y, width, height) {
    this.img.src = imgSrc
    this.x = x
    this.y = y
    this.start = x
    this.width = width
    this.height = height

    this.visible = true
    this.left = 0
  }

  setLeft(left) {
    this.left = left
  }

  update() {
    if (!this.visible) {
      return
    }
    super.update()

    this.x = this.start + this.left

    if (this.x <= -(window.innerWidth + this.width)) {
      databus.recycleBarrier(this)
    }
  }

}