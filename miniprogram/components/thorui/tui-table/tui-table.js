Component({
	// options: { virtualHost: true},
  properties: {
    //border width 不需要border传0即可
		borderWidth: {
			type: String,
			value: '1rpx'
		},
		//border color
		borderColor: {
			type: String,
			value: '#EAEEF5'
		},
		//是否需要上边框
		borderTop: {
			type: Boolean,
			value: true
		},
		//是否需要左边框
		borderLeft: {
			type: Boolean,
			value: true
		},
		//是否需要下边框
		borderBottom: {
			type: Boolean,
			value: false
		},
		//是否需要右边框
		borderRight: {
			type: Boolean,
			value: false
		}

  }
})
