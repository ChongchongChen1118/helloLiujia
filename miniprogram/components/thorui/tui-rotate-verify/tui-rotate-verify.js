Component({
  properties: {
    //1-前端验证 2-后端验证，返回旋转角度
    type: {
      type: Number,
      optionalTypes: [String],
      value: 1
    },
    //是否显示验证弹框
    show: {
      type: Boolean,
      value: false,
      observer(val) {
        if (!val) {
          this.setData({
            isPass: false,
            isShow: false
          })
        }
      }
    },
    //验证弹层外层盒子宽度 rpx
    width: {
      type: Number,
      value: 600
    },
    //圆角 rpx
    radius: {
      type: Number,
      value: 24
    },
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    padding: {
      type: String,
      value: '60rpx 30rpx'
    },
    //图片地址
    imgSrc: {
      type: String,
      value: '/static/components/verify/rotate_verify.jpg'
    },
    //图片宽度，约定为正方形图片 rpx
    imgWidth: {
      type: Number,
      value: 240
    },
    imgRadius: {
      type: String,
      value: '50%'
    },
    //图片默认旋转角度 -330deg<angle <-30deg 或 30deg<angle<330deg
    angle: {
      type: Number,
      value: 30
    },
    //角度误差范围
    errorRange: {
      type: Number,
      value: 5
    },
    //关闭图标颜色
    closeColor: {
      type: String,
      value: '#999'
    },
    //关闭图标字体大小 rpx
    closeSize: {
      type: Number,
      value: 40
    },
    title: {
      type: String,
      value: '安全验证'
    },
    titleColor: {
      type: String,
      value: '#999'
    },
    titleSize: {
      type: Number,
      value: 30
    },
    desc: {
      type: String,
      value: '拖动滑块，使图片角度为正'
    },
    descColor: {
      type: String,
      value: '#333'
    },
    descSize: {
      type: Number,
      value: 36
    },
    //滑动条宽度 rpx
    sliderBarWidth: {
      type: Number,
      value: 540
    },
    //滑动条高度 rpx
    sliderBarHeight: {
      type: Number,
      value: 96
    },
    //滑动条边框 V2.8.0+ 之后废弃
    // sliderBarBorder: {
    //   type: String,
    //   value: '1rpx solid #5677fc'
    // },
    //滑动条边框 宽度 V2.8.0+
    sliderBarBorderWidth: {
      type: String,
      optionalTypes:[Number],
      value: 2
    },
    //V2.8.0+
    sliderBarBorderStyle: {
      type: String,
      value: 'solid'
    },
    //V2.8.0+
    sliderBarBorderColor: {
      type: String,
      value: ''
    },
    sliderBarBackground: {
      type: String,
      value: 'rgba(86,119,252,.1)'
    },
    blockBackground: {
      type: String,
      value: ''
    },
    arrowColor: {
      type: String,
      value: '#fff'
    },
    arrowSize: {
      type: Number,
      value: 40
    },
    errorColor: {
      type: String,
      value: ''
    },
    successColor: {
      type: String,
      value: ''
    },
    zIndex: {
      type: Number,
      value: 999
    },
    maskZIndex: {
      type: Number,
      value: 998
    },
    //点击遮罩 是否可关闭
    maskClosable: {
      type: Boolean,
      value: true
    },
    //重置滑块，改变数值即表示重置操作，多次重置数值递增
    reset: {
      type: Number,
      value: 0,
      observer(val) {
        if (val > 0) {
          this.setData({
            isPass: false
          })
        }
      }
    }
  },
  observers: {
    'isShow': function (val) {
      if (val) {
        setTimeout(() => {
          this.setData({
            isShow: false
          })
        }, 300)
      }
    }
  },
  data: {
    sliderWidth: 0,
    sliderHeight: 0,
    isPass: false,
    isShow: false,
    g_primary:(wx.$tui && wx.$tui.color.primary) || '#5677fc',
    g_errorColor:(wx.$tui && wx.$tui.color.danger) || '#EB0909',
    g_successColor: (wx.$tui && wx.$tui.color.success) || '#07c160'
  },
  lifetimes: {
    attached: function () {
      this.initData();
    }
  },
  methods: {
    rpx2px(value) {
      let sys = wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    initData() {
      this.setData({
        sliderWidth: this.rpx2px(this.data.sliderBarWidth),
        sliderHeight: this.rpx2px(this.data.sliderBarHeight)
      })
    },
    success() {
      //验证成功
      this.setData({
        isPass: true
      })
      this.triggerEvent('success', {});
    },
    error() {
      //验证失败
      this.setData({
        isPass: false,
        isShow: true
      })
      this.triggerEvent('error', {});
    },
    maskClick() {
      if (!this.data.maskClosable) return;
      this.close()
    },
    close() {
      this.triggerEvent('close', {});
      this.setData({
        isPass: false,
        isShow: true
      })
    },
    result(e) {
      this.triggerEvent('result', e)
    }
  }
})