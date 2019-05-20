const app = getApp();
const baseUrl = app.globalData.nowUrl
export default class Http {
  request (params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: params.url || baseUrl, // 仅为示例，并非真实的接口地址
        data: params.data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          if (res.statusCode === 200) {
            resolve(res)
          } else {
            wx.showToast({
              title: '请求错误',
              icon: 'error',
              duration: 2000
            })
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}
