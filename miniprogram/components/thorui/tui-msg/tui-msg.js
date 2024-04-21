Component({
  properties: {
    title: {
			type: String,
			value: ''
		},
		type: {
			type: String,
			value: ''
		},
		color:{
			type: String,
			value: ''
		},
		//icon size
		size: {
			type: Number,
			value: 64
		},
		src: {
			//设置src 之后，type失效
			type: String,
			value: ''
		},
		width: {
			type: String,
			value: '180rpx'
		},
		height: {
			type: String,
			value: '180rpx'
		},
		desc: {
			type: String,
			value: ''
		}
  },
  data:{
    g_color:(wx.$tui && wx.$tui.color.success) || '#07c160'
  }
})
