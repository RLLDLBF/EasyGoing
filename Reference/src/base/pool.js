// @author: wyndam
// @email: only.night@qq.com

// const __ = {
//   name: Symbol('name')
// }

export default class Pool {

  constructor() {
    this.pool = {}
  }

  put(name, obj) {
    let list = this.pool[name]
    if (list == null) {
      this.pool[name] = []
    }

    this.pool[name].push(obj)
  }

  get(name) {
    let list = this.pool[name]
    if (list != null) {
      return list.shift()
      //shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
    }

    return null
  }

}