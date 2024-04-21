Component({
  options: {
    multipleSlots: true
  },
  properties: {
    //slider宽度 px
    width: {
      type: Number,
      value: 240
    },
    //slider高度 px
    height: {
      type: Number,
      value: 4
    },
    border: {
      type: String,
      value: '0'
    },
    //slider圆角
    radius: {
      type: String,
      value: '2px'
    },
    //最小值
    min: {
      type: Number,
      value: 0
    },
    //最大值
    max: {
      type: Number,
      value: 100
    },
    //步长，取值必须大于 0，并且可被(max - min)整除
    step: {
      type: Number,
      value: 1
    },
    //是否禁用
    disabled: {
      type: Boolean,
      value: false
    },
    //当前取值（起始）
    value: {
      type: Number,
      value: 0,
      observer(val) {
        this.setData({
          initValue: val,
          start: val
        })
      }
    },
    //是否为区间选择/显示
    section: {
      type: Boolean,
      value: false
    },
    //当前取值（结束），section为true时生效
    endValue: {
      type: Number,
      value: 0,
      observer(val) {
        this.setData({
          initEndValue: val,
          end: val
        })
      }
    },
    //滑块左侧已选择部分的线条颜色
    activeColor: {
      type: String,
      value: ''
    },
    //滑块右侧背景条的颜色
    backgroundColor: {
      type: String,
      value: '#e9e9e9'
    },
    //滑块宽度 px
    blockWidth: {
      type: Number,
      value: 20
    },
    //滑块高度 px
    blockHeight: {
      type: Number,
      value: 20
    },
    //滑块背景颜色
    blockColor: {
      type: String,
      value: '#fff'
    },
    //滑块圆角
    blockRadius: {
      type: String,
      value: '50%'
    },
    //滑块阴影
    blockShadow: {
      type: String,
      value: '#b2b2b2 0 0 10rpx'
    },
    //滑块边框
    blockBorder: {
      type: String,
      value: '0'
    },
    //是否显示当前value
    showValue: {
      type: Boolean,
      value: false
    },
    //value显示位置 top，bottom
    position: {
      type: String,
      value: 'top'
    },
    //value显示格式，如：￥value,显示时value会被替换成数值
    valueFormat: {
      type: String,
      value: 'value'
    },
    //value框z-index值
    zIndex: {
      type: Number,
      value: 10
    },
    //value框颜色
    boxColor: {
      type: String,
      value: 'rgba(255,255,255,.9)'
    },
    padding: {
      type: String,
      value: '2px 6px'
    },
    //value字体颜色
    valueColor: {
      type: String,
      value: '#333'
    },
    //value字体大小 rpx
    valueSize: {
      type: Number,
      value: 30
    }
  },
  data: {
    start: 0,
    end: 0,
    initValue: 0,
    initEndValue: 0,
    g_activeColor: (wx.$tui && wx.$tui.color.primary) || '#5677fc'
  },
  lifetimes: {
    attached: function () {
      this.setData({
        start: this.data.value || this.data.min,
        end: this.data.endValue || this.data.max
      })
      setTimeout(() => {
        this.setData({
          initValue: this.data.value,
          initEndValue: this.data.endValue || this.data.max
        })
      }, 10)
    }
  },
  methods: {
    getParams(e) {
      let val = e.value || 0;
      if (this.data.section && !e.isStart) {
        this.setData({
          end: val
        })
      } else {
        this.setData({
          start: val
        })
      }
      let params = {
        value: this.data.start
      }
      if (this.data.section) {
        params.endValue = this.data.end
      }
      return params
    },
    change(e) {
      let params = this.getParams(e)
      this.triggerEvent('change', params);
    },
    changing(e) {
      let params = this.getParams(e)
      this.triggerEvent('changing', params);
    },
    stop() {}
  }
})