Component({
  properties: {
    item: {
			type: Object,
			value:{}
		},
		//是否为列表展示
		isList: {
			type: Boolean,
			value: false
		},
		//status：1-已结束，2-正在进行，3-即将开枪
		status: {
			type: Number,
			value: 2
		}
  },
  data: {

  },
  methods: {
    detail(){
      //项目中应该传id
      wx.navigateTo({
        url: `../seckillDetail/seckillDetail?status=${this.data.status}`,
      })
		}
  }
})
