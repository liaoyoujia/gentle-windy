// miniprogram/pages/index/index.js
const app = getApp();
const globalData = app.globalData
import Http from '../../http/index'
import {meregeData} from '../../util/index'
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
    time: '',
    threeDayData:[],
    defaultData:{
      key: ['tmp', 'fl', 'hum', 'pcpn', 'wind_dir', 'wind_deg', 'wind_sc', 'wind_spd', 'vis', 'pres', 'cloud', ''],
      val: {
        tmp: '温度(℃)',
        fl: '体感温度(℃)',
        hum: '相对湿度(%)',
        pcpn: '降水量(mm)',
        wind_dir: '风向',
        wind_deg: '风向角度(deg)',
        wind_sc: '风力(级)',
        wind_spd: '风速(mk/h)',
        vis: '能见度(km)',
        pres: '气压(mb)',
        cloud: '云量',
      },
    },
    nowCityData:{},
    weatherIconUrl: globalData.weatherIconUrl,
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMainWeather()
    this.getThreeDays()
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
        let time = res.data.HeWeather6[0].update.loc.slice(5)
        this.setData({
          nowCityData:res.data.HeWeather6[0].now,
          time
        })
      }
    })
  },
  getThreeDays () {
    http.request({ url: globalData.forecastUrl, data: { location: 'beijing', key: globalData.key } }).then((res) => {
      let prams=['cond_txt_d','date','tmp_max','tmp_min','wind_dir','wind_sc','cond_code_d']
      let threeDayData=meregeData(res.data.HeWeather6[0].daily_forecast,prams)
      this.setData({
        threeDayData
      })
    })
  }
})
