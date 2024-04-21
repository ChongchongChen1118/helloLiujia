Component({
  properties: {
    // 1-默认步骤 2-数字步骤
    type: {
      type: Number,
      value: 1
    },
    spacing: {
      type: String,
      value: '160rpx'
    },
    // 方向 row column
    direction: {
      type: String,
      value: 'row'
    },
    // 激活状态成功颜色
    activeColor: {
      type: String,
      value: ''
    },
    // 未激活状态颜色
    deactiveColor: {
      type: String,
      value: '#999999'
    },
    //title字体大小
    titleSize: {
      type: Number,
      value: 28
    },
    //title是否粗体
    bold: {
      type: Boolean,
      value: false
    },
    //desc字体大小
    descSize: {
      type: Number,
      value: 24
    },
    // 当前步骤
    activeSteps: {
      type: Number,
      value: -1
    },
		//线条样式 同border线条样式
		lineStyle: {
			type: String,
			value: 'solid'
		},
    /**
     * [{
        title: "标题",
        desc: "描述",
        name:"字体图标 thorui icon内", 
        icon:"图片图标", 
        activeIcon:"已完成步骤显示图片图标"
      }]
     * */
    items: {
      type: Array,
      value: []
    },
		//自定义item内容时背景色
		backgroundColor:{
			type: String,
			value: '#fff'
		}
  },
  data:{
    g_activeColor: (wx.$tui && wx.$tui.color.primary) || '#5677fc'
  },
  methods:{
    handleClick(e){
      let index=Number(e.currentTarget.dataset.index)
      this.triggerEvent('click',{index:index})
    }
  }
})