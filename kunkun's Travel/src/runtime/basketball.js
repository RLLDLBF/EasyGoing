import EvnItem from '../runtime/envItem.js'

const BASKETBALL_IMG_SRC = 'images/basketball.png'

const BASKETBALL_WIDTH = 70
const BASKETBALL_HEIGHT = 70

export default class Basketball extends EvnItem{
  constructor(){
    super(BASKETBALL_IMG_SRC,0,0,BASKETBALL_WIDTH,BASKETBALL_HEIGHT)

    this.left = 0
  }

  init(imgSrc,x,y,width,height){
    this.img.src=imgSrc
    this.x=x
    this.y=y
    this.start=x
    this.width=width
    this.height=height

    this.visible = true
    this.left = 0
  }

  setLeft(left){
    this.left=left
  }

  update(){
    if(!this.visible){
      return
    }
    super.update()

    this.x=this.start+this.left

    if(this.x<=-(window.innerWidth+this.width)){
      databus.recycleBarrier(this)
    }
  }
}