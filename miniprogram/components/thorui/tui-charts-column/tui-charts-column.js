Component({
  properties: {
    //图例，说明
    legend: {
      type: Object,
      value: {
        show: false,
        size: 24,
        color: '#333'
      }
    },
    tooltip: {
      type: Boolean,
      value: false
    },
    xAxis: {
      type: Array,
      value: []
    },
    //默认选中x轴索引
    currentIndex: {
      type: Number,
      value: -1,
      observer(newVal) {
        if (newVal != this.data.activeIndex) {
          this.setData({
            activeIndex: newVal
          })
        }
      }
    },
    //柱状条宽度
    columnBarWidth: {
      type: Number,
      optionalTypes:[String],
      value: 32
    },
    //分割线
    splitLine: {
      type: Object,
      value: {
        //分割线颜色,不显示则将颜色设置为transparent
        color: "#e3e3e3",
        type: "dashed"
      }
    },
    //x轴刻度线
    xAxisTick: {
      type: Object,
      value: {
        height: '12rpx',
        //不显示则将颜色设置为transparent
        color: '#e3e3e3'
      }
    },
    //x轴线条
    xAxisLine: {
      type: Object,
      value: {
        color: '#e3e3e3',
        //x轴item的padding值
        itemPadding: '0 30rpx'
      }
    },
    xAxisLabel: {
      type: Object,
      value: {
        color: "#333",
        size: 24,
        height: 60
      }
    },
    xAxisVal: {
      type: Object,
      value: {
        show: false,
        color: "#333",
        size: 24,
        //如果show为true且val显示的时候，height需要设置一定的值保证val能显示完整 rpx
        height: 60
      }
    },
    //y轴数据，如果不传则默认使用min,max值计算
    // {
    // 	value: 0,
    // 	color: "#333"
    // }
    yAxis: {
      type: Array,
      value: [],
      observer(val) {
        this.init()
      }
    },
    //y轴最小值
    min: {
      type: Number,
      value: 0
    },
    //y轴最大值
    max: {
      type: Number,
      value: 100
    },
    //y轴分段递增数值 
    splitNumber: {
      type: Number,
      value: 20
    },
    yAxisLine: {
      type: Object,
      value: {
        //不显示则将颜色设置为transparent
        color: '#e3e3e3',
        //y轴item间距 rpx
        itemGap: 60
      }
    },
    yAxisLabel: {
      type: Object,
      value: {
        show: true,
        color: "#333",
        size: 24
      }
    },
    //是否可滚动
    scrollable: {
      type: Boolean,
      value: false
    },
    //是否堆叠展示
    isStack: {
      type: Boolean,
      value: false
    },
    //柱状条点击效果：1-出现背景，2-高亮显示，其他变暗 3-无效果
    clickEffect: {
      type: Number,
      value: 1
    },
    /*
       柱状条的端点样式
       round	向线条的每个末端添加圆形线帽
       square	向线条的每个末端添加正方形线帽
      */
    columnCap: {
      type: String,
      value: 'square'
    },
    //是否支持负数显示
    isMinus: {
      type: Boolean,
      value: true
    }
  },
  data: {
    height: 0,
    scrollViewH: 0,
    sections: 0,
    yAxisData: [],
    activeIndex: -1,
    activeIdx: -1,
    tooltips: [],
    tooltipShow: false,
    timer: null,
    yAxisValArr: [],
    /*========options============*/
    /*
      name: '', 
      color: '',
      source: []
      colorFormatter:Function
    */
    dataset: [],
    xAxisValFormatter: null
  },
  lifetimes: {
    attached: function () {
      this.init()
      this.setData({
        activeIndex: this.data.currentIndex
      })
    },
    detached: function () {
      this.clearTimer()
    }
  },
  methods: {
    generateArray(start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start);
    },
    getYAxisVal(index) {
      let showVal = '';
      let val = 0;
      if (this.data.dataset.length === 1) {
        val = this.data.dataset[0].source[index]
        showVal = val;
      } else if (this.data.dataset.length > 1) {
        let arr = []
        this.data.dataset.forEach(item => {
          arr.push(item.source[index])
        })
        val = arr
      }
      if (this.data.xAxisVal.formatter && typeof this.data.xAxisVal.formatter === 'function') {
        showVal = this.data.xAxisVal.formatter(val)
      } else if (this.data.xAxisValFormatter && typeof this.data.xAxisValFormatter === 'function') {
        showVal = this.data.xAxisValFormatter(val)
      }
      return showVal
    },
    getBarColor(val, color, colorFormatter) {
      let bgColor = color;
      if (colorFormatter && typeof colorFormatter === 'function') {
        let formatColor = colorFormatter(val)
        if (formatColor) {
          bgColor = formatColor
        }
      }
      return bgColor
    },
    init() {
      let itemGap = this.data.yAxisLine.itemGap || 60;
      let sections = this.data.yAxis.length - 1;
      let yAxis = this.data.yAxis;
      if (sections <= 0) {
        sections = Math.ceil((this.data.max - this.data.min) / this.data.splitNumber)
        let sectionsArr = this.generateArray(0, sections)

        yAxis = sectionsArr.map(item => {
          return {
            value: item * this.data.splitNumber + this.data.min
          }
        })
      }
      const valH = this.data.xAxisVal.show ? (this.data.xAxisVal.height || 2) : 0;
      let yAxisValArr = []
      this.data.xAxis.forEach((item, index) => {
        yAxisValArr.push(this.getYAxisVal(index))
      })
      let dataset = [...this.data.dataset]
      dataset.map((item, index) => {
        let source = [...item.source]
        item.colors = source.map((val, idx) => {
          return this.getBarColor(val, item.color, item.colorFormatter)
        })
      })
      this.setData({
        dataset: dataset,
        yAxisData: yAxis,
        sections: sections + 1,
        height: itemGap * sections,
        scrollViewH: itemGap * sections + (this.data.xAxisLabel.height || 60) + valH,
        yAxisValArr: yAxisValArr
      })
    },
    clearTimer() {
      clearTimeout(this.data.timer)
      this.data.timer = null;
    },
    tooltipHandle(index) {
      let data = [...this.data.dataset]
      let tooltips = []
      data.forEach(item => {
        let color = item.color;
        if (item.colorFormatter && typeof item.colorFormatter === 'function') {
          color = item.colorFormatter(item.source[index])
        }
        tooltips.push({
          color: color,
          name: item.name,
          val: item.source[index]
        })
      })
      this.clearTimer()
      this.setData({
        tooltips: tooltips,
        tooltipShow: true
      })
      this.data.timer = setTimeout(() => {
        this.setData({
          tooltipShow: false
        })
      }, 5000)
    },
    onBarTap(e) {
      let dataset = e.currentTarget.dataset;
      const index = Number(dataset.index)
      const idx = Number(dataset.idx)
      this.setData({
        activeIndex: index,
        activeIdx: idx
      })
      this.tooltipHandle(index);
      this.triggerEvent('click', {
        datasetIndex: idx,
        sourceIndex: index,
        ...this.data.dataset[idx]
      })
    },
    /*
    dataset：柱状图表数据
    xAxisValFormatter :格式化柱状条顶部value值（此处传值是为了做兼容处理）
    */
    draw(dataset, xAxisValFormatter) {
      this.data.xAxisValFormatter = xAxisValFormatter || null;
      this.setData({
        dataset: dataset || []
      })
      this.init();
    }
  }
})