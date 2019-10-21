import Sprite from '../base/sprite.js'
import Chicken from '../runtime/chicken.js'

const CHICKEN_IMG_SRC = 'images/chicken.png'
const CHICKEN_WIDTH = 70
const CHICKEN_HEIGHT = 70

export default class ChickenPair extends Sprite{
  constructor(){
    super(CHICKEN_IMG_SRC,0,0,CHICKEN_WIDTH,CHICKEN_HEIGHT)

    this.width = px2dp(this.width) / 1.3
    this.height = px2dp(this.height) / 1.3

    this.left = 0
    
    this.scored = false

    this.chicken =  new Chicken()
  }

  init(chickenImg, x, y) {
    this.chicken.init(chickenImg, x, y, this.width, this.height)

    this.visible = true
    this.scored = false
    this.left = 0
  }

  draw(ctx){
    if (!this.visible) {
      return
    }

    this.chicken.draw(ctx)
  }

  update() {
    if (!this.visible) {
      return
    }
    this.chicken.update()
  }

  isCollideEdgeWith(target) {
    return false
  }

  isPassed(player) {
    if (this.scored) {
      return false
    }
    /** 
    let score = (player.x>this.chicken.x+this.chicken.width&&
    player.y<this.chicken.y+this.chicken.height&&
    player.y+player.height>this.chicken.y)
    **/
    let score = this.chicken.isCollideEdgeWith(player)
    if(score){
      this.scored = true
      this.chicken.visible = false
    }
    return score
    
    //碰到chicken，加一分
  }

}