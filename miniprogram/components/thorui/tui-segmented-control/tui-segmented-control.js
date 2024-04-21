Component({
  properties: {
    values: {
      type: Array,
      value: []
    },
    current: {
      type: Number,
      value: 0,
      observer(val) {
        if (val !== this.data.currentIndex) {
          this.setData({
            currentIndex: val
          })
        }
      }
    },
    activeColor: {
      type: String,
      value: '#5677fc'
    },
    height: {
      type: String,
      value: '56rpx'
    },
    //字体大小
    size: {
      type: String,
      value: '28rpx'
    },
    radius: {
      type: String,
      value: '4px'
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    currentIndex: 0
  },
  lifetimes: {
    attached: function () {
      this.setData({
        currentIndex: this.data.current
      })
    }
  },
  methods: {
    handleClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      if (this.data.currentIndex !== index && !this.data.disabled){
        this.setData({
          currentIndex: index
        })
        this.triggerEvent('click', {
          index: index
        })
      }
    }
  }
})