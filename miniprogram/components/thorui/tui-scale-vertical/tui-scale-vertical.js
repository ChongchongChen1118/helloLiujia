Component({
  properties: {
    //默认值
    value: {
      type: Number,
      value: 0,
      observer(val){
        this.getTop()
      }
    },
    //刻度尺外层容器宽度/高度 ，默认为屏幕宽度
    height: {
      type: Number,
      value: 0,
      observer(val){
        this.getHeight();
      }
    },
    //刻度尺外层容器背景色
    backgroundColor: {
      type: String,
      value: '#FEFEFE'
    },
    //刻度尺外层容器 padding-right值 rpx
    paddingRight: {
      type: Number,
      optionalTypes:[String],
      value: 30
    },
    //刻度尺最小值
    min: {
      type: Number,
      value: 0,
      observer(val){
        this.getLength();
      }
    },
    //刻度尺最大值
    max: {
      type: Number,
      value: 10,
      observer(val){
        this.getLength();
      }
    },
    //标尺每段的间隔，取值必须大于 0，并且可被(max - min)整除
    interval: {
      type: Number,
      value: 1
    },
    //刻度线长度（最短）rpx
    width: {
      type: Number,
      value: 40
    },
    //刻度线长度（中等）rpx
    mWidth: {
      type: Number,
      value: 60
    },
    //刻度线长度（最长）rpx
    lWidth: {
      type: Number,
      value: 80
    },
    //刻度线颜色
    lineColor: {
      type: String,
      value: '#333'
    },
    //单个格子高度 px
    singleHeight: {
      type: Number,
      value: 8
    },
    //刻度值字体大小
    size: {
      type: Number,
      optionalTypes:[String],
      value: 32
    },
    //刻度值字体颜色
    color: {
      type: String,
      value: '#000'
    },
    //刻度值距离刻度线距离 rpx
    left: {
      type: Number,
      value: 12
    },
    //是否需要指针
    isPointer: {
      type: Boolean,
      value: true
    },
    //刻度尺指针宽度 px
    pointerWidth: {
      type: Number,
      value: 12
    },
    //刻度尺指针颜色
    pointerColor: {
      type: String,
      value: ''
    },
    //刻度尺指针left值 px
    pointerLeft: {
      type: Number,
      value: -12
    }
  },
  data: {
    tickMarks: 10,
    rulerLength: 1,
    scrollHeight: 0,
    currentTop: 0,
    g_pointerColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc'
  },
  lifetimes:{
    attached:function(){
      this.getHeight();
		  this.getLength();
    },
    ready:function(){
      this.getTop()
    }
  },
  methods: {
    getHeight() {
      if (!this.data.height) {
        let sys = wx.getSystemInfoSync();
        this.setData({
          scrollHeight:sys.windowWidth
        })
      } else {
        this.setData({
          scrollHeight:this.data.height
        })
      }
    },
    getLength() {
      //必须满足整除
      this.setData({
        rulerLength:parseInt((this.data.max - this.data.min) / this.data.interval)
      })
    },
    getTop() {
      let value = this.data.value;
      if (value < this.data.min) value = this.data.min;
      if (value > this.data.max) value = this.data.max;
      this.setData({
        currentTop:this.data.singleHeight * 10 / this.data.interval * (value - this.data.min)
      })
    },
    handleScroll(e) {
      let scrollTop = e.detail.scrollTop;
      let value = this.data.min + (scrollTop / this.data.singleHeight / 10 * this.data.interval);
      if (value < this.data.min) value = this.data.min;
      if (value > this.data.max) value = this.data.max;
      this.triggerEvent('change', {
        value: value
      })
    }
  }
})