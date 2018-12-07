/**
 * 一个发布-订阅模式的实现
 * 用来解决两个任意组件间的数据传递（一般是非父子组件，因为父子组件用props更好）
 **/
const eventProxy = {
  onObj: {},
  oneObj: {},
  on: function(key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = []
    }

    this.onObj[key].push(fn)
  },
  one: function(key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = []
    }

    this.oneObj[key].push(fn)
  },
  off: function(key) {
    this.onObj[key] = []
    this.oneObj[key] = []
  },
  trigger: function() {
    let key, args
    if (arguments.length === 0) {
      return false
    }
    key = arguments[0]
    args = [].concat(Array.prototype.slice.call(arguments, 1))

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      for (let i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args)
      }
    }
    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      for (let i in this.oneObj[key]) {
        this.oneObj[key][i].apply(null, args)
        this.oneObj[key][i] = undefined
      }
      this.oneObj[key] = []
    }
  }
}

export default eventProxy
