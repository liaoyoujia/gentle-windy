// miniprogram/pages/index/index.js
const app = getApp();
const globalData = app.globalData
const { img, color } = app.globalData
import Http from '../../http/index'
import { meregeData } from '../../util/index'
const http = new Http()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowChoose: false,
    img: img || 'accomplishment-adventure-clear-sky-585825',
    color: color || '#004a89',
    threeDayData: [],
    defaultData: {
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
    comments: '我走过山时,山不说话。我走过海时,海不说话。',
    nowArea: '定位中',
    nowCityData: {},
    defaultHourData: {
      key: ['tmp', 'cond_txt', 'hum', 'dew', 'pop', 'wind_dir', 'wind_deg', 'wind_sc', 'wind_spd', 'pres', 'cloud', ''],
      val: {
        tmp: '温度(℃)',
        cond_txt: '天气',
        hum: '相对湿度(%)',
        dew: '露点温度(℃)',
        pop: '降水概率',
        wind_dir: '风向',
        wind_deg: '风向角度(deg)',
        wind_sc: '风力(级)',
        wind_spd: '风速(mk/h)',
        pres: '气压(mb)',
        cloud: '云量',
      }
    },
    nowHourData: [],
    lifeData: [],
    weatherIconUrl: globalData.weatherIconUrl,
    indicatorDots: false,
    searchValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: that.data.color,
    })
    wx.getLocation({
      success (res) {
        that.getMainWeather(`${res.latitude},${res.longitude}`)
        that.getThreeDays(`${res.latitude},${res.longitude}`)
        that.getHourData(`${res.latitude},${res.longitude}`)
        that.getLifeData(`${res.latitude},${res.longitude}`)
      }
    })
  },
  changeBg () {
    this.setData({
      isShowChoose: true
    })
  },
  hideChoosePage (data) {
    this.setData({
      isShowChoose: false,
      img: data.detail.img,
      color: data.detail.deFaultColor
    })
  },
  getMainWeather (location) {
    http.request({ url: globalData.nowUrl, data: { location, key: globalData.key } }).then((res) => {
      if (res.data.HeWeather6[0].now) {
        let time = res.data.HeWeather6[0].update.loc.slice(5)
        let nowArea = res.data.HeWeather6[0].basic.location
        this.setData({
          nowCityData: res.data.HeWeather6[0].now,
          time,
          nowArea
        })
      }
    })
  },
  getThreeDays (location) {
    http.request({ url: globalData.forecastUrl, data: { location, key: globalData.key } }).then((res) => {
      let prams = ['cond_txt_d', 'date', 'tmp_max', 'tmp_min', 'wind_dir', 'wind_sc', 'cond_code_d']
      let threeDayData = meregeData(res.data.HeWeather6[0].daily_forecast, prams)
      this.setData({
        threeDayData
      })
    })
  },
  getHourData (location) {
    http.request({ url: globalData.hourlyUrl, data: { location, key: globalData.key } }).then((res) => {
      if (res.data.HeWeather6[0].hourly && res.data.HeWeather6[0].hourly.length) {
        this.setData({
          nowHourData: res.data.HeWeather6[0].hourly
        })
      };
    })
  },
  getLifeData (location) {
    http.request({ url: globalData.lifestyleUrl, data: { location, key: globalData.key } }).then((res) => {
      if (res.data.HeWeather6[0].lifestyle && res.data.HeWeather6[0].lifestyle.length) {
        this.setData({
          lifeData: res.data.HeWeather6[0].lifestyle
        })
      };
    })
  },
 
  searchCity (e) {
    if (e.detail.value) {
      this.changeCity(e.detail.value, this.clearInput)
    }
  },
  clearInput () {
    this.setData({
      searchValue: ''
    })
  },
  changeCity (value, fn) {
    if (value === '520' || value === '521' || value === '520hcy' || value === '521hcy' || value === 'hcy') {
      this.setData({
        comments: '情不所起,一往而深！'
      })
    }
    if (value) {
      this.getMainWeather(value)
      this.getThreeDays(value)
      this.getHourData(value)
      this.getLifeData(value)
    }
    fn()
  }
})
