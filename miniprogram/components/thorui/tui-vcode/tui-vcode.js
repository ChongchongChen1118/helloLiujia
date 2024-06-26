/**
 * 获取范围内的随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}
/**
 * 获取范围内的随机颜色值
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
const randomColor = (min, max) => {
  const _r = randomNum(min, max)
  const _g = randomNum(min, max)
  const _b = randomNum(min, max)
  return `rgb(${_r}, ${_g}, ${_b})`
}
const canvasId = `tui_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  properties: {
    //验证码范围字符串
    vcodeStr: {
      type: String,
      value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    },
    //验证码长度
    length: {
      type: String,
      optionalTypes: [Number],
      value: 4,
    },
    //画布宽度
    width: {
      type: String,
      optionalTypes: [Number],
      value: 100,
    },
    //画布高度
    height: {
      type: String,
      optionalTypes: [Number],
      value: 36,
    },
    //画布背景色
    bgColor: {
      type: String,
      value: '',
    },
    //画布字体颜色
    fontColor: {
      type: String,
      value: '',
    },
    //是否显示干扰点
    hasPoint: {
      type: Boolean,
      value: true,
    },
    //是否显示干扰线
    hasLine: {
      type: Boolean,
      value: true
    }
  },
  data: {
    canvasId: canvasId,
    ctx: null
  },
  lifetimes: {
    ready: function () {
      setTimeout(() => {
        this.draw()
      }, 50)
    },
    detached: function () {
      this.data.ctx = null
    }
  },
  methods: {
    render(ctx) {
      let vcode = ''
      if (typeof ctx.setTextBaseline === 'function') {
        ctx.setTextBaseline('bottom')
      }
      let width = Number(this.data.width)
      let height = Number(this.data.height)
      // 绘制矩形，并设置填充色
      ctx.setFillStyle(this.data.bgColor ? this.data.bgColor : randomColor(180, 240))
      ctx.fillRect(0, 0, width, height)

      let num = Number(this.data.length) || 4
      // 绘制随机生成 n 位的验证码
      for (let i = 0; i < num; i++) {
        const x = (width - 10) / num * i + 10
        const y = randomNum(height / 2, height)
        const deg = randomNum(-45, 45)
        const txt = this.data.vcodeStr[randomNum(0, this.data.vcodeStr.length)]
        const fontSize = randomNum(16, 40)
        const halfHeight = parseInt(height / 2)

        vcode += txt
        ctx.setFillStyle(this.data.fontColor ? this.data.fontColor : randomColor(10, 100))
        ctx.setFontSize(fontSize > halfHeight ? halfHeight : fontSize)
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      }
      // 绘制干扰线
      if (!!this.data.hasLine) {
        for (let i = 0; i < num; i++) {
          ctx.setStrokeStyle(randomColor(90, 180))
          ctx.beginPath()
          ctx.moveTo(randomNum(0, width), randomNum(0, height))
          ctx.lineTo(randomNum(0, width), randomNum(0, height))
          ctx.stroke()
        }
      }
      // 绘制干扰点
      if (!!this.data.hasPoint) {
        for (let i = 0; i < num * 10; i++) {
          ctx.setFillStyle(randomColor(0, 255))
          ctx.beginPath()
          ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
          ctx.fill()
        }
      }
      return vcode
    },
    draw() {
      if (!this.data.ctx) {
        this.data.ctx = wx.createCanvasContext(this.data.canvasId, this)
      }
      this.data.ctx.clearRect(0, 0, this.data.width, this.data.height)
      const value = this.render(this.data.ctx)
      this.data.ctx.draw(false, () => this.triggerEvent('change', {
        value
      }))
    }
  }
})