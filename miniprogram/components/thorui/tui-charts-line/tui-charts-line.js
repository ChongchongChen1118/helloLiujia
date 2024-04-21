Component({
  properties: {
    //图表宽度
    width: {
      type: Number,
      optionalTypes:[String],
      value: 620
    },
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
      value: -1
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
        //x轴item间距 rpx
        itemGap: 120
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
        show: true,
        color: "#333",
        size: 24,
        //如果show为true且val显示的时候，height需要设置一定的值保证val能显示完整 rpx
        height: 48
      }
    },
    //点击坐标点所显示的分割线
    yAxisSplitLine: {
      type: Object,
      value: {
        //分割线颜色,不显示则将颜色设置为transparent
        color: "transparent",
        type: "dashed"
      }
    },
    //折线坐标点宽度 rpx
    brokenDot: {
      type: Object,
      value: {
        width: 12,
        //点的背景色
        color: '#F8F8F8'
      }
    },
    //折线高度/粗细 px
    brokenLineHeight: {
      type: Number,
      optionalTypes:[String],
      value: 1
    },
    //y轴数据，如果不传则默认使用min,max值计算
    // {
    // 	value: 0,
    // 	color: "#333"
    // }
    yAxis: {
      type: Array,
      value: []
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
    dots: [],
    lines: [],
    /*========options============*/
    /*
      name: '', 
      color: '',
      source: []
      colorFormatter:Function
    */
    dataset: [],
    xAxisValFormatter: null,
    maxValue: 1
  },
  lifetimes: {
    attached: function () {
      this.init()
      this.setData({
        activeIdx: this.data.currentIndex
      })
    },
    detached: function () {
      this.clearTimer()
    }
  },
  methods: {
    getYAxisVal(val) {
      let showVal = val;
      if (this.data.xAxisVal.formatter && typeof this.data.xAxisVal.formatter === 'function') {
        showVal = this.data.xAxisVal.formatter(showVal)
      } else if (this.data.xAxisValFormatter && typeof this.data.xAxisValFormatter === 'function') {
        showVal = this.data.xAxisValFormatter(showVal)
      }
      return showVal
    },
    generateArray(start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start);
    },
    getValue(val) {
      return val < 0 ? 0 : val;
    },
    getCoordinatePoint() {
      const xAxis = [...this.data.xAxis];
      const xSections = xAxis.length;
      const ySections = this.data.yAxisData.length - 1;
      const itemGap = this.data.scrollable ? (this.data.xAxisLine.itemGap || 120) : (this.data.width / xSections);
      let dots = [];
      let radius = (this.data.brokenDot.width || 12) / 2;
      this.data.dataset.map((item, index) => {
        let source = item.source || []
        let dotArr = []
        let vals = []
        source.map((val, idx) => {
          dotArr.push({
            x: this.getValue((0.5 + idx) * itemGap - radius),
            y: this.getValue((val - this.data.min) / (this.data.maxValue - this.data.min) * (this.data.yAxisLine.itemGap || 60) *
              ySections - radius)
          })
          vals.push(this.getYAxisVal(val))
        })
        dots.push({
          color: item.color,
          source: dotArr,
          vals: vals
        })
      })
      this.setData({
        dots: dots
      })
      this.drawLines(dots);
    },
    drawLines(dots) {
      let lines = []
      // dots是点的集合 : Array<{ x: number; y: number; }>
      let radius = (this.data.brokenDot.width || 12) / 2;
      dots.map((item, idx) => {
        let dotArr = item.source;
        let lineArr = [];
        dotArr.map((dot, index) => {
          // 最后一个点没有连线
          if (!dotArr[index + 1]) return;
          const AB = {
            x: dotArr[index + 1].x - dot.x,
            y: dotArr[index + 1].y - dot.y,
            y1: dot.y - dotArr[index + 1].y
          }
          // 向量的模
          const v = Math.sqrt(Math.pow(AB.x, 2) + Math.pow(AB.y, 2));
          // 求出偏转角度
          const angle = Math.atan2(AB.y1, AB.x) * (180 / Math.PI);
          lineArr.push({
            x: dot.x + radius,
            y: dot.y + radius - 1,
            width: v,
            angle: AB.y1 > 0 ? Math.sqrt(Math.pow(angle, 2)) : -Math.sqrt(Math.pow(
              angle,
              2))
          })
        })
        lines.push({
          color: item.color,
          source: lineArr
        })
      })
      this.setData({
        lines: lines
      })
    },
    init() {
      let itemGap = this.data.yAxisLine.itemGap || 60;
      let sections = this.data.yAxis.length - 1;
      let yAxis = this.data.yAxis;
      if (sections <= 0) {
        sections = Math.ceil((this.data.max - this.data.min) / this.data.splitNumber)
        let sectionsArr = this.generateArray(0, sections || 1)
        yAxis = sectionsArr.map(item => {
          return {
            value: item * this.data.splitNumber + this.data.min
          }
        })
      }
      const valH = this.data.xAxisVal.height || 48;
      this.setData({
        maxValue: sections <= 0 ? yAxis[yAxis.length - 1].value : this.data.max,
        yAxisData: yAxis,
        sections: sections + 1,
        height: itemGap * sections,
        scrollViewH: itemGap * sections + (this.data.xAxisLabel.height || 60) + valH
      }, () => {
        this.getCoordinatePoint();
      })
    },
    /*
    dataset：折线图表数据
    xAxisValFormatter :格式化折线拐点value值（此处传值是为了做兼容处理）
    */
    draw(dataset, xAxisValFormatter) {
      this.data.xAxisValFormatter = xAxisValFormatter || null;
      this.setData({
        dataset: dataset || []
      })
      this.init();
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
    dotClick(e) {
      const dataset = e.currentTarget.dataset;
      const index = Number(dataset.i)
      const idx = Number(dataset.j)
      this.setData({
        activeIndex: index,
        activeIdx: idx
      })
      this.tooltipHandle(idx);
      this.triggerEvent('click', {
        datasetIndex: index,
        sourceIndex: idx,
        ...this.data.dataset[index]
      })
    }
  }
})