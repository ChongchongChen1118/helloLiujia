Component({
  properties: {
    //背景色
    background: {
      type: String,
      value: 'transparent'
    },
    //是否固定在顶部
    isFixed: {
      type: Boolean,
      value: false
    },
    //z-index值，isFixed为true时生效
    zIndex: {
      type: Number,
      value: 998
    }
  },
  data: {
    statusBarHeight: '0'
  },
  lifetimes: {
    attached: function () {
      let statusBarHeight = wx.getSystemInfoSync().statusBarHeight + 'px'
      this.setData({
        statusBarHeight
      })
      this.triggerEvent('init', {
        statusBarHeight: statusBarHeight
      })
    }
  }
})