Component({
  properties: {
    //发送前显示文本
    text: {
      type: String,
      value: '发送验证码'
    },
    //发送中显示文本
    sendText: {
      type: String,
      value: '请稍候...'
    },
    //发送后显示文本(前面会自动加上seconds)
    countdownText: {
      type: String,
      value: 's后获取'
    },
    //倒计时秒数
    seconds: {
      type: Number,
      value: 60
    },
    //宽度
    width: {
      type: String,
      value: '182rpx'
    },
    //高度
    height: {
      type: String,
      value: '56rpx'
    },
    padding: {
      type: String,
      value: '0'
    },
    margin: {
      type: String,
      value: '0'
    },
    //圆角
    radius: {
      type: String,
      value: '6rpx'
    },
    //字体大小 rpx
    size: {
      type: Number,
      value: 24
    },
    //字体颜色
    color: {
      type: String,
      value: ''
    },
    //背景色
    background: {
      type: String,
      value: 'transparent'
    },
    //边框宽度
    borderWidth: {
      type: String,
      value: '1px'
    },
    //边框颜色
    borderColor: {
      type: String,
      value: ''
    },
    //倒计时的时候是否改变opacity值
    isOpacity: {
      type: Boolean,
      value: true
    },
    //是否需要点击效果
    hover: {
      type: Boolean,
      value: true
    },
    //短信发送成功（改变数值且数值大于0表示发送成功，多次发送数值递增即可）
    successVal: {
      type: Number,
      value: 0,
      observer(val) {
        if (val && val > 0) {
          this.doLoop();
        }
      }
    },
    //重置组件状态（改变数值且数值大于0，多次重置数值递增即可）
    resetVal: {
      type: Number,
      value: 0,
      observer(val) {
        if (val && val > 0) {
          this.reset();
        }
      }
    },
    //是否默认为倒计时状态
    start: {
      type: Boolean,
      value: false
    },
    //自定义参数
    params: {
      type: Number,
      optionalTypes:[String],
      value: 0
    }
  },
  data: {
    showText: '',
    //1-发送前，2-发送中 3-发送成功，倒计时
    status: 1,
    countdownTimer: null,
    g_color:(wx.$tui && wx.$tui.color.primary) || '#5677fc',
    g_borderColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc'

  },
  lifetimes: {
    attached: function () {
      if (this.data.start) {
        this.doLoop();
      } else {
        this.setData({
          showText: this.data.text
        })
        this.clearTimer();
      }
    },
    detached: function () {
      this.clearTimer();
    }
  },
  methods: {
    sendCode() {
      if (this.data.status > 1) return;
      this.clearTimer();
      this.setData({
        status:2,
        showText:this.data.sendText
      })
      this.triggerEvent('send', {
        params: this.data.params
      });
    },
    doLoop: function () {
      this.clearTimer();
      let seconds = this.data.seconds || 60;
      this.setData({
        status:3,
        showText:seconds + this.data.countdownText
      })
      this.data.countdownTimer = setInterval(() => {
        if (seconds > 1) {
          --seconds;
          this.setData({
            showText:seconds + this.data.countdownText
          })
          //倒计时
          this.triggerEvent('countdown', {
            seconds: seconds,
            params: this.data.params
          });
        } else {
          this.reset();
          //倒计时结束
          this.triggerEvent('end', {
            params: this.data.params
          });
        }
      }, 1000);
    },
    //验证码发送成功
    success() {
      this.doLoop();
    },
    //重置发送组件
    reset() {
      this.clearTimer();
      this.setData({
        showText:this.data.text,
        status:1
      })
    },
    clearTimer() {
      clearInterval(this.data.countdownTimer);
      this.data.countdownTimer = null;
    }
  }
})