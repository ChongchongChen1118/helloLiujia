Component({
  properties: {
    //显示类型：1-dot 2-index 3-title 4-右侧停靠index 
    type: {
      type: Number,
      value: 1
    },
    //总数
    count: {
      type: Number,
      value: 0
    },
    //当前索引
    current: {
      type: Number,
      value: 0
    },
    //当前标题
    currentTitle: {
      type: String,
      value: ""
    },
    //left值
    left: {
      type: String,
      value: "0"
    },
    right: {
      type: String,
      value: "auto"
    },
    bottom: {
      type: String,
      value: "30rpx"
    },
    //指示点[type in (1,2)]或外层盒子[type in (3,4)]宽度
    width: {
      type: String,
      value: "16rpx"
    },
    //指示点[type in (1,2)]或外层盒子[type in (3,4)]高度
    height: {
      type: String,
      value: "16rpx"
    },
    //指示点圆角
    radius: {
      type: String,
      value: "50%"
    },
    //背景色
    backgroundColor: {
      type: String,
      value: "#bfbfbf"
    },
    //当前展示item背景色
    activeBgColor: {
      type: String,
      value: ""
    },
    //字体颜色
    color: {
      type: String,
      value: "#333"
    },
    //当前展示item字体颜色，type=2时生效
    activeColor: {
      type: String,
      value: "#fff"
    },
    //字体大小
    size: {
      type: Number,
      value: 28
    },
    //指示点margin值
    margin: {
      type: String,
      value: "0 8rpx"
    },
    //type=3时生效
    padding: {
      type: String,
      value: "0 30rpx"
    }
  },
  data:{
    g_activeBgColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc'
  }
})