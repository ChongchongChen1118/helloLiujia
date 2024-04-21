Component({
  properties: {
    //统计名称
    title: {
      type: String,
      value: ''
    },
    //饼状图直径 rpx
    diam: {
      type: Number,
      value: 400
    },
    //饼状图背景色
    backgroundColor: {
      type: String,
      value: 'transparent'
    },
    //图例，说明
    legend: {
      type: Object,
      value: {
        show: true,
        size: 24,
        color: '#333',
        //horizontal，vertical
        direction: 'horizontal'
      }
    },
    tooltip: {
      type: Boolean,
      value: true
    },
    //展示类型：1-饼状 2-环状
    type: {
      type: Number,
      value: 1
    },
    //环形中间圆圈样式
    annular: {
      type: Object,
      value: {
        width: 200,
        backgroundColor: '#f8f8f8'
      }
    }
  },
  lifetimes: {
    detached: function () {
      this.clearTimer()
    }
  },
  data: {
    tooltips: [],
    tooltipShow: false,
    timer: null,
    activeIndex: -1,
    /*========options============*/
    /*
        value:0, 
      name: '', 
      color: ''
    */
    dataset: []
  },
  methods: {
    getTotalVal(data) {
      let val = 0;
      data.forEach((item, index) => {
        val += item.value;
      })
      return val;
    },
    init(dataset) {
      let data = [...dataset]
      const total = this.getTotalVal(data);
      let totalAngle = 0;
      data.map((item, index) => {
        item.transformAngle = totalAngle;
        item.angle = Number((item.value / total * 360).toFixed(1))
        totalAngle += item.angle
      })
      this.setData({
        dataset: data
      })
    },
    draw(dataset) {
      this.init(dataset)
    },
    clearTimer() {
      clearTimeout(this.data.timer)
      this.data.timer = null;
    },
    itemClick(e) {
      const index = Number(e.currentTarget.dataset.index)
      this.clearTimer()
      this.setData({
        activeIndex: index,
        tooltipShow: true
      })
      this.data.timer = setTimeout(() => {
        this.setData({
          tooltipShow: false
        })
      }, 5000)
      this.triggerEvent('click', {
        index: index,
        ...this.data.dataset[index]
      })
    }
  }
})