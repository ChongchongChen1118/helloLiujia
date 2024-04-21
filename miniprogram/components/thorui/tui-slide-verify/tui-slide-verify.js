Component({
  properties: {
    //滑动条宽度 px
    slideBarWidth: {
      type: Number,
      optionalTypes:[String],
      value: 300
    },
    //滑块宽度 px = 滑动条高度
    slideBlockWidth: {
      type: Number,
      optionalTypes:[String],
      value: 40
    },
    //滑块border颜色
    borderColor: {
      type: String,
      value: '#E9E9E9'
    },
    //通过验证后滑块border颜色
    activeBorderColor: {
      type: String,
      value: ''
    },
    //误差范围 px 距离右侧多少距离验证通过
    errorRange: {
      type: Number,
      optionalTypes:[String],
      value: 2
    },
    //重置滑动
    resetSlide: {
      type: Number,
      value: 0,
      observer(val) {
        if (val > 0) {
          this.slideReset();
        }
      }
    },
    //提示文字大小 rpx
    size: {
      type: Number,
      value: 30
    },
    //提示文字颜色
    color: {
      type: String,
      value: '#444'
    },
    //验证通过后提示文字颜色
    activeColor: {
      type: String,
      value: '#fff'
    },
    //图标字体大小 rpx
    iconSize: {
      type: Number,
      value: 32
    },
    //箭头图标颜色
    arrowColor: {
      type: String,
      value: '#cbcbcb'
    },
    checkColor: {
      type: String,
      value: ''
    },
    //滑动条背景色
    backgroundColor: {
      type: String,
      value: '#E9E9E9'
    },
    //滑过区域背景颜色
    activeBgColor: {
      type: String,
      value: ''
    },
    //通过提示文字
    passText: {
      type: String,
      value: '验证通过'
    }
  },
  data: {
    isPass: false,
    disabled: false,
    reset: 0,
    g_success:(wx.$tui && wx.$tui.color.success) || '#07c160'
  },
  methods: {
    success() {
      //验证成功
      this.setData({
        isPass: true,
        disabled: true
      })
      this.triggerEvent('success', {});
    },
    slideReset() {
      this.setData({
        isPass: false,
        disabled: false,
        reset: this.data.reset + 1
      })
    }
  }
})