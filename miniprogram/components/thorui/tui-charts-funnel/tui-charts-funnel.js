function ascSort(a, b) {
  return a.value - b.value;
}

function descSort(a, b) {
  return b.value - a.value;
}
Component({
  properties: {
    //统计名称
			title: {
				type: String,
				value: ''
			},
			//总宽度 rpx
			width: {
        type: String,
        optionalTypes:[Number],
				value: 400
			},
			height: {
        type: String,
        optionalTypes:[Number],
				value: 480
			},
			//间距 rpx
			gap: {
        type: String,
        optionalTypes:[Number],
				value: 4
			},
			//图例，说明
			legend: {
				type: Object,
				value:{
          show: true,
          size: 24,
          color: '#333',
          //horizontal、vertical
          direction: 'horizontal'
        }
			},
			tooltip: {
				type: Boolean,
				value: true
			},
			//asc，desc
			sort: {
				type: String,
				value: 'desc'
			}
  },
  data: {
    tooltips: [],
    tooltipShow: false,
    timer: null,
    activeIndex: -1,
    dataset: [],
    itemHeight: 60,
    w: 200,
    h: 240
  },
  lifetimes:{
    detached:function(){
      this.clearTimer()
    }
  },
  methods: {
    rpx2px(value){
      let sys=wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    getPx(rpx) {
      let px = parseInt(this.rpx2px(Number(rpx)))
      return px % 2 === 0 ? px : px - 1
    },
    getEvenNum(px) {
      px = parseInt(px)
      return px % 2 === 0 ? px : px - 1
    },
    draw(data) {
      let dataList = JSON.parse(JSON.stringify(data))
      let dataset = dataList.sort(descSort)
      let w = this.getPx(this.data.width || 400)
      let h = this.getPx(this.data.height || 480)
      let len = dataset.length
      let gap = Number(this.data.gap) * (len - 1)
      let max = Number(dataset[0].value)
      this.setData({
        w:w,
        h:h,
        itemHeight:(h - this.getPx(gap)) / len
      })
      dataset.map((item, index) => {
        let width = index === 0 ? w : this.getEvenNum(Number(item.value) / max * w)
        if (dataset[index + 1]) {
          let w1 = this.getEvenNum(Number(dataset[index + 1].value) / max * w)
          item.diff = Math.abs(width - w1) / 2
        } else {
          item.diff = width / 2
        }
        item.width = width - (item.diff || 0) * 2
      })
      if (this.data.sort === 'asc') {
        this.setData({
          dataset:dataset.sort(ascSort)
        })
      } else {
        this.setData({
          dataset:dataset
        })
      }
    },
    clearTimer() {
      clearTimeout(this.data.timer)
      this.data.timer = null;
    },
    itemClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      this.clearTimer()
      this.setData({
        activeIndex:index,
        tooltipShow:true
      })
      this.data.timer = setTimeout(() => {
        this.setData({
          tooltipShow:false
        })
      }, 5000)
      this.triggerEvent('click', {
        index: index,
        ...this.data.dataset[index]
      })
    }
  }
})
