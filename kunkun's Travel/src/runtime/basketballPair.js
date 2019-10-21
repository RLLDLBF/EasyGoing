import Sprite from '../base/sprite.js'
import Basketball from '../runtime/basketball.js'

const BASKETBALL_IMG_SRC = 'images/basketball.png'
const BASKETBALL_WIDTH = 70
const BASKETBALL_HEIGHT = 70

export default class BasketballPair extends Sprite{
  constructor(){
    super(BASKETBALL_IMG_SRC,0,0,BASKETBALL_WIDTH,BASKETBALL_HEIGHT)

    this.width = px2dp(this.width)/1.3
    this.height = px2dp(this.height)/1.3

    this.left=0
    
    this.scored =false

    this.basketball =new Basketball()
  }

  init(basketballImg,x,y){
    this.basketball.init(basketballImg,x,y,this.width,this.height)

    this.visible = true
    this.scored = false
    this.left = 0
  }

  draw(ctx){
    if(!this.visible){
      return
    }

    this.basketball.draw(ctx)
  }

  update(){
    if(!this.visible){
      return
    }
    this.basketball.update()
  }

  isCollideEdgeWith(target){
    return(this.basketball.isCollideEdgeWith(target))
  }

  //basketball不需要判断得分机制，只需要碰撞机制
  isPassed(player){
    if(this.scored){
      return false
    }
    this.scored = true
    return false
    //返回false，不加分
  }

}