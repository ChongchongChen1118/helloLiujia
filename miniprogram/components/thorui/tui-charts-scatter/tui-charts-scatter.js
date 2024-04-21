Component({
  properties: {
      //图例，说明
			legend: {
				type: Object,
				value:{
          show: false,
          size: 24,
          color: '#333'
        }
			},
			tooltip: {
				type: Boolean,
				value: true
			},
			xAxis: {
				type: Object,
				value: {
          min: 0,
          max: 100,
          splitNumber: 20
        }
			},
			//x轴刻度线
			xAxisTick: {
				type: Object,
				value:{
          height: '12rpx',
          //不显示则将颜色设置为transparent
          color: '#e3e3e3'
        }
			},
			//x轴线条
			xAxisLine: {
				type: Object,
				value:{
          color: '#e3e3e3',
          itemGap: 100
        }
			},
			xAxisLabel: {
				type: Object,
				value:{
          color: "#333",
          size: 24
        }
			},
			yAxis: {
				type: Object,
				value:{
          min: 0,
          max: 100,
          splitNumber: 20
        }
			},
			yAxisLine: {
				type: Object,
				value:{
          //不显示则将颜色设置为transparent
          color: '#e3e3e3',
          //y轴item间距 rpx
          itemGap: 80
        }
			},
			//y轴刻度线
			yAxisTick: {
				type: Object,
				value:{
          width: '12rpx',
          //不显示则将颜色设置为transparent
          color: '#e3e3e3'
        }
			},
			yAxisLabel: {
				type: Object,
				value:{
          color: "#333",
          size: 24
        }
			},
			//分割线
			splitLine: {
				type: Object,
				value:{
          //分割线颜色,不显示则将颜色设置为transparent
          color: "#e3e3e3",
          type: "dashed"
        }
			}
  },
  lifetimes:{
    detached:function(){
      this.clearTimer()
    }
  },
  data: {
    width: 0,
    height: 0,
    xAxisData: [],
    yAxisData: [],
    activeIndex: -1,
    activeIdx: -1,
    dataset: [],
    tooltips: {},
    tooltipShow: false,
    timer: null
  },
  methods: {
    generateArray(start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start);
    },
    init(dataset, xAxisValFormatter) {
      let xTotal = this.data.xAxis.max - this.data.xAxis.min
      let yTotal = this.data.yAxis.max - this.data.yAxis.min
      let xSections = Math.ceil(xTotal / this.data.xAxis.splitNumber)
      let ySections = Math.ceil(yTotal / this.data.yAxis.splitNumber)
      let xSectionsArr = this.generateArray(0, xSections)
      let ySectionsArr = this.generateArray(0, ySections)
      let xAxisData = xSectionsArr.map((item, index) => {
        let val = item * this.data.xAxis.splitNumber + this.data.xAxis.min
        val = xAxisValFormatter ? xAxisValFormatter(val) : val
        return {
          id: 'x_' + index,
          value: val
        }
      })
      let yAxisData = ySectionsArr.map((item, idx) => {
        return {
          id: 'y_' + idx,
          value: item * this.data.yAxis.splitNumber + this.data.yAxis.min
        }
      })
      
      let width = (this.data.xAxisLine.itemGap || 100) * xSections
      let height = (this.data.yAxisLine.itemGap || 80) * ySections;
      dataset.map((item, i) => {
        item.id = 'd_' + i;
        item.source = item.source.map(model => {
          return {
            x: (Number(model[0]) - this.data.xAxis.min) / xTotal * width,
            y: (Number(model[1]) - this.data.yAxis.min) / yTotal * height,
            name: model[2],
            x1: model[0],
            y1: model[1]
          }
        })
      })
      console.log(dataset)
      this.setData({
        xAxisData:xAxisData,
        yAxisData:yAxisData,
        width:width,
        height: height,
        dataset:dataset
      })
    },
    draw(dataset, xAxisValFormatter) {
      dataset = dataset || [];
      this.init(dataset, xAxisValFormatter);
    },
    clearTimer() {
      clearTimeout(this.data.timer)
      this.data.timer = null;
    },
    tooltipHandle(index, idx) {
      let data = this.data.dataset[index]
      let item = data.source[idx]
      let tooltips = {
        color: data.color,
        val: item.name || `${item.x1}，${item.y1}`
      }
      this.clearTimer()
      this.setData({
        tooltips:tooltips,
        tooltipShow:true
      })
      this.data.timer = setTimeout(() => {
        this.setData({
          tooltipShow:false
        })
      }, 5000)
    },
    onDotTap(e) {
      let dataset=e.currentTarget.dataset;
      console.log(dataset)
      let index=Number(dataset.index)
      let idx = Number(dataset.idx)
      this.setData({
        activeIndex:index,
        activeIdx:idx
      })
      this.tooltipHandle(index, idx);
      this.triggerEvent('click', {
        datasetIndex: index,
        sourceIndex: idx
      })
    }
  }
})
