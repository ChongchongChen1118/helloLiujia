Component({
  properties: {
    //数量
    quantity: {
      type: Number,
      value: 5
    },
    //当前评分，小数只支持0.5
    score: {
      type: Number,
      optionalTypes:[String],
      value: 0,
      observer(val) {
        this.starActive(val)
      }
    },
    //禁用点击
    disabled: {
      type: Boolean,
      value: false
    },
    //星星大小 px
    size: {
      type: Number,
      value: 20
    },
    //星星宽度 px，大于等于size值，设置间距使用
    width: {
      type: Number,
      value: 20
    },
    //未选中颜色
    normal: {
      type: String,
      value: '#b2b2b2'
    },
    //选中颜色
    active: {
      type: String,
      value: ''
    },
    //是否支持半星选择/展示
    isHalf: {
      type: Boolean,
      value: true
    },
    //超过多少比例选中半星（取值区间0~0.5）
    halfRate: {
      type: Number,
      value: 0.25
    },
    //自定义参数
    params: {
      type: Number,
      optionalTypes:[String],
      value: 0
    }
  },
  data: {
    pageX: 0,
    intScore: 0,
    decimalScore: 0,
    g_active:(wx.$tui && wx.$tui.color.danger) || '#EB0909'
  },
  lifetimes: {
    attached: function () {
      this.starActive(this.data.score);
    },
    ready: function (){
      const className = '.tui-grade__box';
      let query = wx.createSelectorQuery().in(this)
      query.select(className).boundingClientRect((res) => {
        this.setData({
          pageX: res.left || 0
        })
      }).exec()
    }
  },
  methods: {
    starActive(val) {
			val = Number(val);
			let intVal = parseInt(val);
			let decimalVal = val % 1;
			if (!this.data.isHalf) {
				intVal = decimalVal > 0 ? intVal + 1 : intVal;
				decimalVal = 0;
      }
      this.setData({
        intScore:intVal,
        decimalScore:decimalVal
      })
		},
		touchMove(e) {
			if (this.data.disabled || !e.changedTouches[0]) return;
			const movePageX = e.changedTouches[0].pageX;
			const distance = movePageX - this.data.pageX;
			let score = 0;
			if (distance > 0) {
				score = distance / this.data.width;
				let decimalScore = score % 1;
				if (!this.data.isHalf) {
					decimalScore = decimalScore > 0 ? 1 : 0;
				} else {
					if (decimalScore > this.data.halfRate) {
						decimalScore = decimalScore <= 0.5 ? 0.5 : 1;
					} else {
						decimalScore = 0;
					}
				}
				score = parseInt(score) + decimalScore;
				score = score > this.data.quantity ? this.data.quantity : score;
			}
			this.triggerEvent('change', {
				score: score,
				params: this.data.params
			});
		}
  }
})