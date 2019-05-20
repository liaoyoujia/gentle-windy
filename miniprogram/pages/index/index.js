// miniprogram/pages/index/index.js
const app = getApp();
const globalData = app.globalData
import Http from '../../http/index'
const http = new Http()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowChoose: false,
    img: 'accomplishment-adventure-clear-sky-585825',
    temp: 0,
    weather: '阴',
    visibility: 3,
    time:'05-16 17:21'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMainWeather()
  },
  changeBg () {
    this.setData({
      isShowChoose: true
    })
  },
  hideChoosePage (data) {
    this.setData({
      isShowChoose: false,
      img: data.detail.img
    })
  },
  getMainWeather () {
    http.request({ url: globalData.nowUrl, data: { location: 'beijing', key: globalData.key } }).then((res) => {
      if (res.data.HeWeather6[0].now) {
        let data = res.data.HeWeather6[0].now
        this.setData({
          weather: data.cond_txt,
          visibility: data.vis,
          temp: data.tmp
        })
      }
    })
  }
})
