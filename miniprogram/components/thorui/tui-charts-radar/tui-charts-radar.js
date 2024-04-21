Component({
  properties: {
      //图例，说明
			legend: {
				type: Object,
				value:{
          show: true,
          size: 24,
          color: '#333'
        }
			},
			tooltip: {
				type: Boolean,
				value: true
			},
			width: {
        type: String,
        optionalTypes:[Number],
				value: 480
			},
			splitNumber: {
        type: String,
        optionalTypes:[Number],
				value: 5
			},
			indicator: {
				type: Array,
				value:[]
			},
			label: {
				type: Object,
				value:{
          show: true,
          color: '#bbb',
          size: 24
        }
			},
			axisLineColor: {
				type: String,
				value: '#ddd'
			},
			splitLineColor: {
				type: String,
				value: '#eee'
			},
			lineBold:{
				type: Boolean,
				value: false
			}
  },
  lifetimes:{
    attached:function(){
      this.setData({
        radar_w:this.getPx(this.data.width)
      })
			this.draw(this.data.dataset)
    },
    detached:function(){
      this.clearTimer()
    }
  },
  data: {
    radar_w: 200,
    dataset: [],
    indicators: [],
    hypotenuse: [],
    name: '',
    color: '',
    tooltips: [],
    tooltipShow: false,
    timer: null
  },
  methods: {
    rpx2px(value){
      let sys=wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    getPx(rpx) {
      let px = parseInt(this.rpx2px(Number(rpx)))
      return px % 2 === 0 ? px : px + 1
    },
    getDrawData(dots, idx, type = 'l') {
      let data = [];
      dots.map((dot, index) => {
        let obj = !dots[index + 1] ? dots[0] : dots[index + 1]
        const AB = {
          x: obj.x - dot.x,
          y: obj.y - dot.y,
          y1: dot.y - obj.y
        }
        const v = Math.sqrt(Math.pow(AB.x, 2) + Math.pow(AB.y, 2));
        const angle = Math.atan2(AB.y1, AB.x) * (180 / Math.PI);
        data.push({
          id: type + idx + '_' + index,
          x: dot.x + 1,
          y: dot.y,
          width: v,
          angle: AB.y1 > 0 ? Math.sqrt(Math.pow(angle, 2)) : -Math.sqrt(Math.pow(angle, 2))
        })
      })
      return data
    },
    initData(dataset, r, indicator, angle) {
      let total = this.data.radar_w
      dataset = JSON.parse(JSON.stringify(dataset))
      dataset.map((item, index) => {
        let lines = []
        item.source.map((val, idx) => {
          let dsR = val / indicator[idx].max * r
          lines.push({
            y: dsR * Math.cos(angle * idx * Math.PI / 180),
            x: dsR * Math.sin(angle * idx * Math.PI / 180)
          })
        })
        item.lines = this.getDrawData(lines, index, 'd')
      })
      this.setData({
        dataset:dataset
      })
    },
    draw(dataset) {
      if (!dataset || !dataset[0] || !this.data.indicator) return
      let len = this.data.indicator.length
      let angle = 360 / len
      let r = this.data.radar_w / 2
      let indicator = JSON.parse(JSON.stringify(this.data.indicator))
      indicator.map((item, i) => {
        item.angle = angle * i
      })
      this.setData({
        indicators:indicator
      })

      let dots = []
      let sn = Number(this.data.splitNumber)
      for (let i = 0; i < sn; i++) {
        let dotArr = []
        let dsDot = []
        let radius = r - i * (r / sn)
        for (let j = 0; j < len; j++) {
          dotArr.push({
            y: radius * Math.cos(angle * j * Math.PI / 180),
            x: radius * Math.sin(angle * j * Math.PI / 180)
          })
        }
        dots.push(dotArr)
      }

      let lineArr = [];
      dots.map((dotArr, idx) => {
        lineArr = lineArr.concat(this.getDrawData(dotArr, idx))
      })
      this.setData({
        hypotenuse:lineArr
      })

      this.initData(dataset, r, indicator, angle)
    },
    clearTimer() {
      clearTimeout(this.data.timer)
      this.data.timer = null;
    },
    tooltipHandle(index) {
      let data = this.data.dataset[index]
      let tooltips = []
      let indicator = JSON.parse(JSON.stringify(this.data.indicator))
      indicator.map((item, idx) => {
        item.value = data.source[idx]
      })
      this.clearTimer()
      this.setData({
        name:data.name || '',
        color: data.color || '#333',
        tooltips:indicator,
        tooltipShow:true
      })
      this.data.timer = setTimeout(() => {
        this.setData({
          tooltipShow:false
        })
      }, 5000)
    },
    onDotTap(e) {
      let index = Number(e.currentTarget.dataset.index)
      this.tooltipHandle(index);
      this.triggerEvent('click', {
        datasetIndex: index
      })
    }
  }
})
