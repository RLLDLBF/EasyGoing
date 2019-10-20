import BasketballPair from './basketballPair.js'

export default class BasketballManager{
  constructor(){}

  /**
   * 根据帧数，间隔一段时间生成一个障碍物，并将其加入全局缓存中
   */
  
  generateBasketballs(frame){
    if(frame % databus.barrierGenFrame===40){
      let barrier = databus.generateBasketball('images/basketball.png', window.innerWidth, window.innerHeight -px2dp(180)-Math.random() * px2dp(300))

      //console.log('generate a basketball')
      databus.barriers.push(barrier)
    }
  }

  draw(ctx){
    for(let i = 0; i<databus.barriers.length;i++){
      //console.log('generate a basketball draw')
      databus.barriers[i].draw(ctx)
    }
  }

  update(){
    for(let i = 0; i< databus.barriers.length;i++){
      //console.log('generate a basketball update')
      databus.barriers[i].update()
    }
  }

}