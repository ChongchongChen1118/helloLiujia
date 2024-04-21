const form = require("./tui-validation.js")
Component({
  properties: {
    //表单数据对象
    model: {
      type: Object,
      value: {}
    },
    //表单验证规则，如果含有自定义校验规则请在校验方法中传入此参数
    rules: {
      type: Array,
      value: []
    },
    //表单背景颜色
    backgroundColor: {
      type: String,
      value: 'transparent'
    },
    //表单padding值
    padding: {
      type: String,
      value: '0'
    },
    //是否显示校验错误信息
    showMessage: {
      type: Boolean,
      value: true
    },
    //表单圆角值
    radius: {
      type: String,
      value: '0'
    },
    //是否禁用该表单内的所有组件,透明遮罩层
    disabled: {
      type: Boolean,
      value: false
    },
    //提示框top值 px
    tipTop: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    //错误提示框padding值
    tipPadding: {
      type: String,
      value: '20rpx'
    },
    //错误提示框背景色
    tipBackgroundColor: {
      type: String,
      value: ''
    },
    //错误提示字体大小
    tipSize: {
      type: String,
      optionalTypes:[Number],
      value: 28
    },
    //错误提示字体颜色
    tipColor: {
      type: String,
      value: '#fff'
    },
    //错误提示框圆角值
    tipRidus: {
      type: String,
      value: '12rpx'
    },
    //错误消息显示时间 ms
    duration: {
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  },
  data: {
    errorMsg: '',
    timer: null,
    g_tipBackgroundColor:(wx.$tui && wx.$tui.tuiForm.tipBackgroundColor) ||
    '#f74d54'
  },
  lifetimes: {
    detached: function () {
      this.clearTimer()
    }
  },
  methods: {
    clearTimer() {
      clearTimeout(this.data.timer)
      this.data.timer = null;
    },
    //props中嵌套传入Function函数会丢失，model和rules参数由props传入改为校验方法validate中传入
    validate(model, rules) {
      model = model || this.data.model
      rules = rules || this.data.rules
      const duration = this.data.duration || (wx.$tui && wx.$tui.tuiForm.duration) || 2000;
      return new Promise((resolve, reject) => {
        let checkRes = form.validation(model, rules);
        let obj = {
          isPass: true,
          errorMsg: checkRes
        };
        if (!checkRes) {
          resolve(obj)
        } else {
          if (this.data.showMessage) {
            this.clearTimer()
            this.setData({
              errorMsg: checkRes
            })
            this.data.timer = setTimeout(() => {
              this.setData({
                errorMsg: ''
              })
            }, Number(duration))
          }
          obj.isPass = false;
          reject(obj)
        }
      })
    }
  }
})