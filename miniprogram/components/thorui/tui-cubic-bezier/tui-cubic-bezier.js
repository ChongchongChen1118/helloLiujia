Component({
  properties: {
    //屏幕宽度[总宽度] px
    windowWidth: {
      type: Number,
      value: 375
    },
    //屏幕高度[总高度] px
    windowHeight: {
      type: Number,
      value: 667
    },
    //badge宽度
    width: {
      type: String,
      value: '40rpx'
    },
    //badge高度
    height: {
      type: String,
      value: '40rpx'
    },
    //动画badge背景颜色
    backgroundColor: {
      type: String,
      value: ''
    },
    //badge left
    left: {
      type: String,
      value: '0'
    },
    //badge top
    top: {
      type: String,
      value: '0'
    },
    //是否自定义动画显示内容
    custom: {
      type: Boolean,
      value: false
    },
    //动画方向: up-右上(top，right)，down-右下(right,bottom), bottom-左下(left,bottom)，top-左上(left,top)
    //括号中为position必传值
    direction: {
      type: String,
      value: 'down'
    },
    //根据方向传值，终点的坐标点，一般为元素中心位置
    position: {
      type: Object,
      value:{
        top: 50,
        bottom: 80,
        left: 30,
        right: 40
      }
    },
    //列表中索引 index
    index: {
      type: Number,
      value: 0
    },
    //自定义参数
    params: {
      type: Number,
      optionalTypes:[String],
      value: 0
    }
  },
  data: {
    time: 0,
    animate: false,
    transform_x: '',
    transform_y: '',
    sys: null,
    g_backgroundColor:(wx.$tui && wx.$tui.color.danger) || '#EB0909'
  },
  methods: {
    handleClick(e) {
			//550ms内防止重复点击
			if (new Date().getTime() - this.data.time <= 550) return;
      this.setData({
        time:new Date().getTime()
      })
			setTimeout(() => {
				this.setData({
          time:0
        })
			}, 550);
			this.bezierEffect(e);
			this.triggerEvent('click', {
				index: this.data.index,
				params: this.data.params
			});
		},
		bezierEffect(e) {
			let touch = e.touches[0];
			let diff = {
				x: 0,
				y: 0
			};
			//up-右上，down-右下, bottom-左下，top-左上
			switch (this.data.direction) {
				case 'up':
					diff.x = this.data.windowWidth - touch.clientX - this.data.position.right;
					diff.y = this.data.position.top - touch.clientY;
					break;
				case 'down':
					diff.x = this.data.windowWidth - touch.clientX - this.data.position.right;
					diff.y = this.data.windowHeight - touch.clientY - this.data.position.bottom;
					break;
				case 'bottom':
					diff.x = this.data.position.left - touch.clientX;
					diff.y = this.data.windowHeight - touch.clientY - this.data.position.bottom;
					break;
				case 'top':
					diff.x = this.data.position.left - touch.clientX;
					diff.y = this.data.position.top - touch.clientY;
					break;
				default:
					break;
			}

			//移动距离
      this.setData({
        animate:true,
        transform_x:`translate3d(${diff.x}px,0,0)`,
        transform_y:`translate3d(0,${diff.y}px,0) rotate(350deg) scale(0.8)`
      })
			setTimeout(() => {
        this.setData({
          animate:false,
          transform_x:'none',
          transform_y:'none'
        })
			}, 550);
		}
  }
})