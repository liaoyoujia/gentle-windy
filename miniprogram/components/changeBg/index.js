const app = getApp();
const { colorTable ,img,color} = app.globalData
console.log(img,color,312331231231123);
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgLists: ['accomplishment-adventure-clear-sky-585825', 'aerial-climate-cold-296559', 'asphalt-blue-sky-clouds-490411', 'backlit-dawn-dusk-327466', 'beach-bird-birds-235787', 'beautiful-cold-dawn-547115', 'clouds-forest-idyllic-417102', 'fog-himalayas-landscape-38326'],
    img: img||'accomplishment-adventure-clear-sky-585825',
    deFaultColor: color||"#004a89"
  },

  // 生命周期
  lifetimes: {
    attached () {
      this.setTopBar()
      // debugger;
    },
  },


  /**
   * 组件的方法列表
   */

  methods: {
    changeBg (e) {
      if (e.target.dataset.imgs) {
        this.setTopBar(colorTable[e.target.dataset.imgs])
        try {
          wx.setStorageSync('imgs', e.target.dataset.imgs)
          wx.setStorageSync('color', colorTable[e.target.dataset.imgs])
        } catch (e) {
          console.log('出错了');
        }
        this.setData({
          img: e.target.dataset.imgs,
          // deFaultColor: colorTable[e.target.dataset.imgs]
        })
      }

    },
    setTopBar (data) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: data ? data : this.data.deFaultColor,
      })
    },
    hideChoose () {
      this.triggerEvent('hideChoose', { img: this.data.img ,color:this.data.deFaultColor})
    }
  }
})
