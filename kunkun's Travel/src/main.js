// @author: wyndam
// @email: only.night@qq.com

import Background from './runtime/background.js'
import Land from './runtime/land.js'

// import BarrierManager from './runtime/barrier-manager.js'
import BasketballManager from './runtime/basketball-manager.js'
import ChickenManager from './runtime/chicken-manager.js'
/*** 
import BarrierManager from './runtime/barrier-manager.js'
***/
import Player from './player/player.js'
import StartGameWindow from './window/startGame.js'
import GameOverWindow from './window/gameOver.js'

import Number from './base/number.js'
import FrameLayout from './base/frameLayout.js'

import DataStore from './base/DataStore.js'

// let ctx = canvas.getContext('2d')
//绘制二维图

//audio
var audio = wx.createInnerAudioContext()
audio.autoplay = true
audio.loop = true
audio.src = 'audio/bg_music.mp3'

var audio_end = wx.createInnerAudioContext()
audio_end.src = 'audio/do_what.mp3'

let openDataContext = wx.getOpenDataContext()
let sharedCanvas = openDataContext.canvas

const ratio = wx.getSystemInfoSync().pixelRatio;

export default class Main {

  constructor() {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.onCreate()

    sharedCanvas.width = window.innerWidth * ratio
    sharedCanvas.height = window.innerHeight * ratio
    DataStore.getInstance().sharedCanvas = sharedCanvas

    this.dataStore = DataStore.getInstance()
    this.dataStore.canvas = this.canvas
    this.dataStore.ctx = this.ctx
    
    // this.dataStore = DataStore.getInstance()
    
    // this.dataStore.canvas=this.canvas
    // this.dataStore.ctx=this.ctx
  }

  onCreate() {
    let that = this
    this.bg = new Background()
    this.land = new Land()
    //this.player = new Player('images/bird.png', window.innerWidth / 3, window.innerHeight / 2 - 25)
    this.player = new Player('images/kunkun.png', window.innerWidth / 3, window.innerHeight / 2 -25)
    //创建一个player坤坤
    this.player.visible = false
    //一开始player不可见
    
    // this.barrierManager = new BarrierManager()
    this.basketballManager =  new BasketballManager()
    this.chickenManager = new ChickenManager()
    /*** 
    this.barrierManager = new BarrierManager()
    ***/
    this.startGameWindow = new StartGameWindow()
    this.gameOverWindow = new GameOverWindow()

    this.gameOverWindow.setOnRestartListener(function() {
      //that.player = new Player('images/bird.png', window.innerWidth / 3, window.innerHeight / 2 - 25)
      //复制一份对象到that中，防止丢失初始对象
      that.player = new Player('images/kunkun.png', window.innerWidth / 3, window.innerHeight / 2 - 25)
      databus.barriers.length = 0
      that.gameStart()
      that.gameOverWindow.visible = false
      that.score.setNumber(0)
    })

    this.gameOverWindow.visible = false

    //得分组件
    this.score = new Number(0);
    this.scoreFrame = new FrameLayout(0, 0, window.innerWidth, window.innerHeight / 3)
    this.scoreFrame.setSprite(this.score)
    this.scoreFrame.setGravity(Gravity.CENTER)
    this.scoreFrame.visible = false

    this.startGameWindow.setOnStartListener(function() {
      that.player.visible = true
      that.scoreFrame.visible = true
    })

    this.bindLoop = this.loop.bind(this)
    window.cancelAnimationFrame(this.aniId);
    databus.running = false

    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
    //web API，执行一个动画，下次重绘前回调函数更新动画
  }

  loop() {

    if (databus.running) {
      databus.frame++;

      // 更新
      this.update()
    }

    // 绘制
    this.render()
    window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )

  }

  render() {
    let ctx = this.ctx
    this.bg.draw(ctx)
    /*** 
    this.barrierManager.draw(ctx)
    ***/
    this.basketballManager.draw(ctx)
    this.chickenManager.draw(ctx)
    // this.barrierManager.draw(ctx)

    this.land.draw(ctx)
    this.player.draw(ctx)
    this.startGameWindow.draw(ctx)

    this.scoreFrame.draw(ctx)
    // ctx.drawImage(sharedCanvas, 0, 0,window.innerWidth,window.innerHeight)
    this.gameOverWindow.draw(ctx)

    if (databus.gameOver) {
      this.gameOverWindow.visible = true
      // ctx.drawImage(sharedCanvas, 0, 0, window.innerWidth, window.innerHeight)
    }
  }

  update() {
    this.bg.update()
    this.land.update()

    /*** 
    this.barrierManager.update()
    this.barrierManager.generateBarriers(databus.frame)
    ***/
    this.basketballManager.update()
    this.basketballManager.generateBasketballs(databus.frame)

    this.chickenManager.update()
    this.chickenManager.generateChickens(databus.frame)
    // this.barrierManager.update()
    // this.barrierManager.generateBarriers(databus.frame)

    this.player.update()

    // collide with land
    if (this.land.isCollideEdgeWith(this.player)) {
      //console.warn('landgameover')
      this.gameOver()
    }

    // collide with barriers
    for (let i = 0; i < databus.barriers.length; i++) {
      if (databus.barriers[i].isCollideEdgeWith(this.player)) {
        //console.warn('ballgameover')
        this.gameOver()
        break
      }
    }

    // score
    for (let i = 0; i < databus.barriers.length; i++) {
      //isPassed返回值为true，这里加一分；否则不加分
      if (databus.barriers[i].isPassed(this.player)) {
        this.score.number++
          // console.log(this.score.number)
        this.score.setNumber(this.score.number)
      }
    }
  }

  gameOver() {
    databus.running = false
    databus.gameOver = true
    databus.speed = 2
    audio.stop()
    audio_end.play()

    this.saveUserCloadStorage();

    this.player.img.src = 'images/kunkun_cry.png'
    this.player.x-=15
    this.player.y-=10
    this.player.width = 95
    this.player.height = 80
    
  } 

  gameStart(){
    databus.running = true
    databus.gameOver = false
    databus.speed = 2
    audio.play()
    audio_end.stop()
  }

  saveUserCloadStorage() {

    let score = '' + this.score.number;
    wx.setUserCloudStorage({
      KVDataList: [{ key: 'score', value: score }],
      success: res => {
        console.log(res);
        // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
        let openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
          type: 'updateMaxScore',
        });
      },
      fail: res => {
        console.log(res);
      }
    });
  }

}