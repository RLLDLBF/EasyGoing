import ChickenPair from './chickenPair.js'

export default class ChickenManager{
  constructor(){}

  generateChickens(frame){
    if(frame%databus.barrierGenFrame===100){
      let randomGen = Math.floor(Math.random() * 10)
      if (randomGen % 2 == 1) {
        let barrier = databus.generateBasketball('images/basketball.png', window.innerWidth, window.innerHeight - px2dp(180) - Math.random() * px2dp(300))
        databus.barriers.push(barrier)
        //console.log('generate a basketball')
      }
      else {
        let barrier = databus.generateChicken('images/chicken.png', window.innerWidth, window.innerHeight - px2dp(180) - Math.random() * px2dp(300))
        databus.barriers.push(barrier)
        //console.log('generate a chicken')
      }
    }
  }

  draw(ctx) {
    for (let i = 0; i < databus.barriers.length; i++) {
      //console.log('generate a basketball draw')
      databus.barriers[i].draw(ctx)
    }
  }

  update() {
    for (let i = 0; i < databus.barriers.length; i++) {
      //console.log('generate a basketball update')
      databus.barriers[i].update()
    }
  }

}