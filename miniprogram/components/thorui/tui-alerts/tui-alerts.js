Component({
  options:{
    multipleSlots: true
  },
  properties: {
    //info, success, warn, waiting,clear
    type: {
      type: String,
      value: 'info'
    },
    //背景色，如果设置type对应颜色失效
    backgroundColor: {
      type: String,
      value: ''
    },
    //nvue不支持简写，['20rpx','30rpx','20rpx','30rpx']=>[上，右，下，左]
    padding: {
      type: Array,
      value: ['20rpx', '30rpx']
    },
    radius: {
      type: String,
      value: '6rpx'
    },
    iconColor: {
      type: String,
      value: '#fff'
    },
    //icon字体大小，px
    iconSize: {
      type: Number,
      value: 24
    },
    closable: {
      type: Boolean,
      value: false
    },
    closeColor: {
      type: String,
      value: '#fff'
    },
    //关闭icon字体大小，px
    closeSize: {
      type: Number,
      value: 24
    },
    //是否自定义左侧内容
    isLeft: {
      type: Boolean,
      value: false
    },
    isRight: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: '#fff'
    },
    size: {
      type: String,
      value: '14px'
    },
    desc: {
      type: String,
      value: ''
    },
    descColor: {
      type: String,
      value: '#fff'
    },
    descSize: {
      type: String,
      value: '12px'
    },
    //描述文字单行展示，超出隐藏
    single: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    leftClick() {
      this.triggerEvent('leftClick', {})
    },
    onClick() {
      this.triggerEvent('click', {})
    },
    close() {
      this.triggerEvent('close', {})
    }
  }
})