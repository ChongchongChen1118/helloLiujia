Component({
  options: {
    multipleSlots: true
  },
  properties: {
    prevText: {
      type: String,
      value: '上一页'
    },
    nextText: {
      type: String,
      value: '下一页'
    },
    width: {
      type: Number,
      value: 156
    },
    height: {
      type: Number,
      value: 68
    },
    borderColor: {
      type: String,
      value: 'transparent'
    },
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    color: {
      type: String,
      value: '#333'
    },
    size: {
      type: Number,
      optionalTypes:[String],
      value: 28
    },
    radius: {
      type: String,
      value: '8rpx'
    },
    //是否自定义按钮显示内容
    custom: {
      type: Boolean,
      value: false
    },
    //当前页码
    current: {
      type: Number,
      optionalTypes:[String],
      value: 1,
      observer(val) {
        this.setData({
          currentIndex: +val
        })
      }
    },
    //当前页码字体颜色
    currentColor: {
      type: String,
      value: ''
    },
    //页码字体颜色
    pageColor: {
      type: String,
      value: '#333'
    },
    //页码字体大小
    pageFontSize: {
      type: Number,
      optionalTypes:[String],
      value: 36
    },
    //是否需要展示页码
    isPage: {
      type: Boolean,
      value: true
    },
    //数据总量
    total: {
      type: Number,
      optionalTypes:[String],
      value: 0,
      observer(val){
        this.getMaxPage()
      }
    },
    //每页数据量
    pageSize: {
      type: Number,
      optionalTypes:[String],
      value: 10,
      observer(val){
        this.getMaxPage()
      }
    }
  },
  lifetimes: {
    attached: function () {
      this.setData({
        currentIndex: +this.data.current
      })
      this.getMaxPage()
    }
  },
  data: {
    currentIndex: 1,
    maxPage: 0,
    g_currentColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc'
  },
  methods: {
    getMaxPage() {
      let maxPage = 1
      let total = Number(this.data.total)
      let pageSize = Number(this.data.pageSize)
      if (total && pageSize) {
        maxPage = Math.ceil(total / pageSize)
      }
      this.setData({
        maxPage: maxPage
      })
    },
    clickPrev() {
      if (Number(this.data.currentIndex) === 1) return;
      this.setData({
        currentIndex: this.data.currentIndex - 1
      })
      this.change('prev')
    },
    clickNext() {
      if (Number(this.data.currentIndex) === this.data.maxPage) return;
      this.setData({
        currentIndex: this.data.currentIndex + 1
      })
      this.change('next')
    },
    change(e) {
      this.triggerEvent('change', {
        type: e,
        current: this.data.currentIndex
      })
    }
  }
})