const cityDetail = require('../../data/staticData.js')
Page({
  data: {
    cityName: [],
    inputValue: '',
    hotCity: ['定位', '北京市', '广州市', '深圳市', '上海市', '南京市', '杭州市', '武汉市']
  },
  onLoad: function () {
    let cityName = this.getCityName(cityDetail.cities)
    this.setData({
      cityName
    })

  },
  getCityName (areas) {
    areas = areas.sort((a, b) => {
      if (a.letter > b.letter) {
        return 1
      }
      if (a.letter < b.letter) {
        return -1
      }
      return 0
    })
    let obj = {}
    for (let i = 0; i < areas.length; i++) {
      let item = areas[i]
      let letter = item.letter
      if (!obj[letter]) {
        obj[letter] = []
      }
      obj[letter].push(item)
    }
    // 返回一个对象，直接用 wx:for 来遍历对象，index 为 key，item 为 value，item 是一个数组
    return obj
  },
  clearInput () {
    console.log(3123123);
    this.setData({
      inputValue: ''
    })

  }
})
