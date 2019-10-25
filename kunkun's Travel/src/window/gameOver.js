// @author: wyndam
// @email: only.night@qq.com

import Button from '../base/button.js'
import Group from '../base/group.js'
import Sprite from '../base/sprite.js'
import FrameLayout from '../base/frameLayout.js'
import LinearLayout from '../base/linearLayout.js'
import DataStore from '../base/DataStore.js'

import Main from '../main.js'

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const ratio = wx.getSystemInfoSync().pixelRatio;

let openDataContext = wx.getOpenDataContext()
let sharedCanvas = openDataContext.canvas

// let canvas = wx.createCanvas()
// let context = canvas.getContext('2d')


export default class GameOverWindow extends Group {

  constructor() {
    super({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    })

    let that = this
    this.restartCallback = null

    this.contentLayout = new LinearLayout(0, 0, window.innerWidth, window.innerHeight)

    this.frame = new FrameLayout(0, 0, window.innerWidth, window.innerHeight)
    this.frame.setGravity(Gravity.CENTER)
    this.frame.setSprite(this.contentLayout)

    //this.gameOverImg = new Sprite('images/text_game_over.png', 0, 0, 204, 54)
    this.gameOverImg = new Sprite('images/kun_game_over.png', 0, 0, 300, 87)
    this.startGameButton = new Button('images/button_play.png', 0, 0, 170, 70)
    this.rankButton = new Button('images/rank.png',0,0,170,129)
    this.introduction = new Sprite('images/introduction.png', 0, 0, 300, 90)

    this.startGameButton.setOnClickListener(function(view) {
      console.log('startGameButton click')
      if (that.ranking) {
        return
      }
      if (that.visible) {
        if (that.restartCallback != null) {
          that.restartCallback()
        }
      }
    })

    let _this = this

    this.rankButton.setOnClickListener(function(view){
      
      console.log('show rank')
      _this.messageSharecanvas()
      // _this.loop()

    })

    this.contentLayout.addSprite(this.gameOverImg, Gravity.CENTER)
    this.contentLayout.addSprite(this.startGameButton, Gravity.CENTER)
    this.contentLayout.addSprite(this.rankButton,Gravity.CENTER)
    this.contentLayout.addSprite(this.introduction,Gravity.CENTER)

  }


  //get rank
  messageSharecanvas(type, text) {
    // 排行榜也应该是实时的，所以需要sharedCanvas 绘制新的排行榜
    let openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage({
      type: type || 'friends',
      text: text,
    });
    this.ranking = true;
  }

  onRankingBack = (e) => {
    let x = e.touches[0].clientX, y = e.touches[0].clientY
    let scale = window.innerWidth / 750
    if (x >= 80 * scale && x <= 180 * scale && y >= 1120 * scale && y <= 1220 * scale) {
      this.ranking = false
    }//返回按钮
  }

  draw(ctx) {
    if (!this.visible) {
      return
    }

    this.frame.draw(ctx)

    if (this.ranking) {
      let _this = this
      //绘制排行榜
      DataStore.getInstance().ctx.drawImage(DataStore.getInstance().sharedCanvas, 0, 0, window.innerWidth, window.innerHeight)
      wx.offTouchStart(this.onRankingBack)
      wx.onTouchStart(this.onRankingBack)
    }
  }

  setOnRestartListener(callback) {
    this.restartCallback = callback
  }

  showResultScene(){
    this.resultCanvas=wx.createCanvas()
    let resultCtx = this.resultCanvas.getContext('2d')
    this.resultCanvas.width = window.innerWidth*ratio
    this.resultCanvas.height=window.innerHeight*ratio
    let scales = window.innerWidth/750
    resultCtx.scale(ratio,ratio)
    resultCtx.scale(scales,scales)

    DataStore.getInstance().resultCanvas = this.resultCanvas
    
    DataStore.getInstance().currentCanvas = 'resultCanvas'

  }

}