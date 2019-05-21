//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      "key": "0e2d75c217104f438618a25dc462eb74",
      "nowUrl": "https://free-api.heweather.net/s6/weather/now",
      "forecastUrl": "https://free-api.heweather.net/s6/weather/forecast",
      "hourlyUrl": "https://free-api.heweather.com/s6/weather/hourly",
      "weatherIconUrl": 'https://cdn.heweather.com/cond_icon/',
      "lifestyleUrl": "https://free-api.heweather.net/s6/weather/lifestyle",
      "colorTable": {
        "beach-bird-birds-235787": "#393836", "clouds-forest-idyllic-417102": "#0085e5", "backlit-dawn-dusk-327466": "#2d2225",
        "accomplishment-adventure-clear-sky-585825": "#004a89", "fog-himalayas-landscape-38326": "#b8bab9", "asphalt-blue-sky-clouds-490411": "#009ffe",
        "aerial-climate-cold-296559": "#d6d1e6", "beautiful-cold-dawn-547115": "#ffa5bc"
      }
    }
  }
})
