Component({
  properties: {
    value: {
      type: Number,
      optionalTypes:[String],
      value: '',
      observer(val) {
        this.initColumn(val)
      }
    },
    color: {
      type: String,
      value: ''
    },
    //rpx
    size: {
      type: Number,
      value: 32
    },
    bold: {
      type: Boolean,
      value: false
    },
    //滚动行高度 rpx
    cellHeight: {
      type: Number,
      value: 32,
      observer(val) {
        this.handleHeight(val)
      }
    },
    //单个数字宽度
    cellWidth: {
      type: String,
      value: 'auto'
    },
    // 动画过渡效果
    animation: {
      type: String,
      value: 'cubic-bezier(0, 1, 0, 1)'
    },
    //动画时间
    duration: {
      type: Number,
      value: 1.2
    }
  },
  data: {
    columns: [],
    keys: [],
    height: 0,
    g_color:(wx.$tui && wx.$tui.color.primary) || '#5677fc'
  },
  lifetimes: {
    attached: function () {
      this.handleHeight(this.data.cellHeight)
      this.initColumn(this.data.value)
    }
  },
  methods: {
    handleHeight(h) {
      this.setData({
        height: wx.getSystemInfoSync().windowWidth / 750 * (h || 0)
      })
    },
    initColumn(val) {
      val = val + '';
      let digit = val.length,
        arr = [],
        rows = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      for (let i = 0; i < digit; i++) {
        if (val[i] === '.' || val[i]===',') {
          arr.push(val[i])
        } else {
          arr.push(rows)
        }
      }
      this.setData({
        columns:arr
      })
      this.roll(val)
    },
    roll(value) {
      let valueArr = value.toString().split(''),
        lengths = this.data.columns.length,
        indexs = [];

      while (valueArr.length) {
        let figure = valueArr.pop();
        if (figure === '.' || figure === ',') {
          indexs.unshift(0)
        } else {
          indexs.unshift(Number(figure))
        }
      }
      while (indexs.length < lengths) {
        indexs.unshift(0)
      }
      this.setData({
        keys:indexs
      })
    }
  }
})