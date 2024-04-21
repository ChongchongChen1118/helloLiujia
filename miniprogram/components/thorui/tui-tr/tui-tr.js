Component({
	options: {
		virtualHost: true
	},
	properties: {
		backgroundColor: {
			type: String,
			value: '#fff'
		},
		//border-bottom width
		borderWidth: {
			type: String,
			value: '1rpx'
		},
		//border-bottom color
		borderColor: {
			type: String,
			value: '#EAEEF5'
		},
		borderLeft: {
			type: Boolean,
			value: false
		},
		borderTop: {
			type: Boolean,
			value: false
		},
		flexWrap: {
			type: Boolean,
			value: false
		},
		fixed: {
			type: Boolean,
			value: false
		},
		left: {
			type: String,
			value: '0'
		},
		right: {
			type: String,
			value: '0'
		},
		top: {
			type: String,
			value: '0'
		},
		marginTop: {
			type: String,
			value: '0'
		},
		//行数索引
		index: {
			type: Number,
			value: 0
		},
		//参数
		params: {
			type: String,
			value: ''
		}
	},
	methods: {
		handleClick() {
			this.triggerEvent('click', {
				index: this.data.index,
				params: this.data.params
			});
		}
	}
})