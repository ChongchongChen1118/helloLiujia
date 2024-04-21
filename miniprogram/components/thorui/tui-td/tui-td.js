Component({
  options: {
    virtualHost: true
  },
  properties: {
    //跨度
    span: {
      type: Number,
      value: 24
    },
    //具体值或者auto
    width: {
      type: String,
      value: ''
    },
    height: {
      type: String,
      value: 'auto'
    },
    size: {
      type: Number,
      value: 30
    },
    color: {
      type: String,
      value: '#333'
    },
    bold: {
      type: Boolean,
      value: false
    },
    backgroundColor: {
      type: String,
      value: 'transparent'
    },
    //border-right width
    borderWidth: {
      type: String,
      value: '1rpx'
    },
    //border-right width
    borderColor: {
      type: String,
      value: '#EAEEF5'
    },
    //是否需要右
    borderRight: {
      type: Boolean,
      value: true
    },
    //是否需要下边框
    borderBottom: {
      type: Boolean,
      value: false
    },
    //是否需要左边框
    borderLeft: {
      type: Boolean,
      value: false
    },
    //文字超出隐藏
    ellipsis: {
      type: Boolean,
      value: false
    },
    padding: {
      type: String,
      value: '12rpx'
    },
    //排列：left,center,right
    alignItems: {
      type: String,
      value: 'left'
    },
    //文本对齐：left,center,right
    textAlign: {
      type: String,
      value: 'left'
    },
    //是否收缩
    shrink: {
      type: Boolean,
      value: true
    },
    //铺满剩余空间
    flexGrow: {
      type: Boolean,
      value: false
    },
    //顶部,上面;
    top: {
      type: Boolean,
      value: false
    },
    hidden: {
      type: Boolean,
      value: false
    },
    //行数索引
    index: {
      type: Number,
      value: 0
    },
    //字段key
    keys: {
      type: String,
      value: ''
    }
  },
  methods: {
    handleClick() {
      this.triggerEvent('click', {
        index: this.data.index,
        key: this.data.keys
      });
    }
  }
})