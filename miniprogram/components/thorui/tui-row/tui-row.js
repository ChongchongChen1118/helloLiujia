Component({
  properties: {
    //是否为flex布局
    isFlex: {
      type: Boolean,
      value: false
    },
    //flex 布局下的水平排列方式 start/end/center/space-around/space-between
    justify: {
      type: String,
      value: 'start'
    },
    //flex 布局下的垂直排列方式	top/middle/bottom
    align: {
      type: String,
      value: 'top'
    },
    marginTop: {
      type: String,
      value: '0'
    },
    marginBottom: {
      type: String,
      value: '0'
    },
    //栅格间间隔，单位rpx
    gutter: {
      type: Number,
      value: 0
    }
  }
})