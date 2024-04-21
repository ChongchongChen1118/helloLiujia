Component({
  properties: {
    //数字框宽度
    width: {
      type: Number,
      value: 36
    },
    //数字框高度
    height: {
      type: Number,
      value: 36
    },
    borderWidth: {
      type: Number,
      value: 0
    },
    //数字框border颜色
    borderColor: {
      type: String,
      value: 'transparent'
    },
    //数字框背景颜色
    backgroundColor: {
      type: String,
      value: 'transparent'
    },
    //数字框字体大小
    size: {
      type: Number,
      value: 32
    },
    //数字框字体颜色
    color: {
      type: String,
      value: '#333'
    },
    //冒号或文字大小
    colonSize: {
      type: Number,
      value: 32
    },
    //冒号或文字颜色
    colonColor: {
      type: String,
      value: '#333'
    },
    //初始时间，单位s
    value: {
      type: Number,
      optionalTypes:[String],
      value: 0,
      observer(val) {
        this.clearTimer();
        this.setData({
          seconds: Number(val)
        })
        this.timer(this.data.seconds);
        setTimeout(() => {
          if (this.data.start) {
            this.startTiming();
          }
        }, 0);
      }
    },
    //最大时间，大于等于最大时间则计时结束，为0则需要手动结束 (单位：秒)
    maxTime: {
      type: Number,
      value: 0
    },
    //是否显示天
    isDays: {
      type: Boolean,
      value: false
    },
    //是否显示小时
    isHours: {
      type: Boolean,
      value: true
    },
    //是否显示分钟
    isMinutes: {
      type: Boolean,
      value: true
    },
    //是否显示秒数
    isSeconds: {
      type: Boolean,
      value: true
    },
    //是否显示毫秒
    isMs: {
      type: Boolean,
      value: false
    },
    msWidth: {
      type: Number,
      value: 0
    },
    msSize: {
      type: Number,
      value: 28
    },
    msColor: {
      type: String,
      value: '#333'
    },
    //时分秒是否展示为冒号,false为文字
    isColon: {
      type: Boolean,
      value: true
    },
    //是否自动开始(传值false，则需要手动调用方法)
    start: {
      type: Boolean,
      value: true
    }
  },
  data: {
    d: '0',
    h: '00',
    m: '00',
    s: '00',
    ms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    seconds: 0,
    loop: null,
    ani: false
  },
  lifetimes: {
    attached: function () {
      let val = Number(this.data.value)
      this.setData({
        seconds: val
      })
      this.timer(val);
      if (this.data.start) {
        this.startTiming();
      }
    },
    detached: function () {
      this.clearTimer();
    }
  },
  methods: {
    clearTimer() {
      this.setData({
        ani: false
      })
      clearInterval(this.data.loop);
      this.data.loop = null;
    },
    //开始
    startTiming() {
      if (this.data.seconds >= this.data.maxTime && this.data.maxTime != 0) {
        this.endTimer();
        return
      }
      this.clearTimer();
      this.setData({
        ani: true
      })
      this.data.loop = setInterval(() => {
        this.setData({
          seconds: this.data.seconds + 1
        })
        this.timer(this.data.seconds);
        if (this.data.seconds >= this.data.maxTime && this.data.maxTime != 0) {
          this.endTimer();
        }
      }, 1000);
    },
    //重置
    resetTimer() {
      this.setData({
        d: '0',
        h: '00',
        m: '00',
        s: '00',
        seconds: 0
      })
      this.clearTimer();
      setTimeout(() => {
        this.startTiming();
      }, 0);
    },
    //结束 | 暂停
    endTimer() {
      this.clearTimer();
      this.triggerEvent('end', {
        day: this.data.d,
        hour: this.data.h,
        minute: this.data.m,
        second: this.data.s,
        totalSeconds: this.data.seconds
      });
    },
    timer(seconds) {
      let [day, hour, minute, second] = [0, 0, 0, 0];
      if (seconds > 0) {
        day = this.data.isDays ? Math.floor(seconds / (60 * 60 * 24)) : 0;
        hour = this.data.isHours ? Math.floor(seconds / (60 * 60)) - day * 24 : 0;
        minute = this.data.isMinutes ? Math.floor(seconds / 60) - hour * 60 - day * 24 * 60 : 0;
        second = this.data.isSeconds ? Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60 : 0;
      }
      hour = hour < 10 ? '0' + hour : hour;
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      this.setData({
        d: day,
        h: hour,
        m: minute,
        s: second
      })
    }
  }
})