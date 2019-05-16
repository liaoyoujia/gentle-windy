// miniprogram/pages/index/index.js
const app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowChoose: false,
    img: 'accomplishment-adventure-clear-sky-585825',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeBg(){
    this.setData({
      isShowChoose: true
    })
  },
  hideChoosePage (data) {
    this.setData({
      isShowChoose: false,
      img:data.detail.img
    })
  }
})
