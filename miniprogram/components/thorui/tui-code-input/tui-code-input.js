Component({
  properties: {
    //组件外层左右间距
			gap: {
        type: String,
        optionalTypes:[Number],
				value: 80
			},
			marginTop: {
				type: String,
        optionalTypes:[Number],
				value: 0
			},
			marginBottom: {
				type: String,
        optionalTypes:[Number],
				value: 0
			},
			//初始值，不可超过length长度
			value: {
				type: String,
        value: '',
        observer(val){
          this.setData({
            focus:true
          })
          const vals = val.replace(/\s+/g, "")
          this.getVals(vals)
        }
			},
			//H5不支持动态切换type类型
			type: {
				type: String,
				value: 'text'
			},
			password: {
				type: Boolean,
				value: false
			},
			disabled: {
				type: Boolean,
				value: false
			},
			//获取焦点
			isFocus: {
				type: Boolean,
        value: false,
        observer(val){
          this.initFocus(val)
        }
			},
			cursor: {
				type: Boolean,
				value: true
			},
			cursorColor: {
				type: String,
				value: ''
			},
			cursorHeight: {
				type: String,
        optionalTypes:[Number],
				value: 60
			},
			//输入框个数
			length: {
				type: Number,
        value: 4,
        observer(val){
          const nums = Number(val);
          if (nums !== this.data.inputArr.length) {
            this.setData({
              inputArr:this.getArr(nums)
            })
          }
        }
			},
			width: {
        type: String,
        optionalTypes:[Number],
				value: 108
			},
			height: {
				type: String,
        optionalTypes:[Number],
				value: 108
			},
			background: {
				type: String,
				value: 'transparent'
			},
			//1-显示所有边框 2-只显示底部边框，3-无边框
			borderType: {
        type: String,
        optionalTypes:[Number],
				value: 1
			},
			borderColor: {
				type: String,
				value: '#eaeef1'
			},
			activeColor: {
				type: String,
				value: ''
			},
			borderWidth: {
				type: String,
        optionalTypes:[Number],
				value: 2
			},
			radius: {
				type: String,
        optionalTypes:[Number],
				value: 0
			},
			size: {
        type: String,
        optionalTypes:[Number],
				value: 48
			},
			color: {
				type: String,
				value: '#333'
			},
			fontWeight: {
				type: String,
        optionalTypes:[Number],
				value: 600
			}
  },
  data: {
    inputArr: [],
    inputVal: [],
    focus: false,
    activeIndex: -1,
    val: '',
    g_cursorColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc',
    g_activeColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc'
  },
  lifetimes:{
    attached:function(){
      this.setData({
        inputArr:this.getArr(Number(this.data.length))
      })
			let val = this.data.value.replace(/\s+/g, "")
			this.getVals(val, true)
    },
    ready:function(){
      setTimeout(() => {
				this.initFocus(this.data.isFocus)
			}, 300)
    }
  },
  methods: {
    initFocus(val) {
      if (this.data.disabled) return;
      if (val && this.data.activeIndex === -1) {
        this.setData({
          activeIndex:0
        })
      }
      if (!this.data.value && !val) {
        this.setData({
          activeIndex:-1
        })
      }
      setTimeout(() => {
        this.setData({
          focus:val
        })
      }, 50);
    },
    getArr(end) {
      return Array.from(new Array(end + 1).keys()).slice(1);
    },
    getVals(val, init = false) {
      this.setData({
        val:val
      })
      if (!val) {
        this.setData({
          inputVal:[],
          activeIndex:init ? -1 : 0
        })
      } else {
        let vals = val.split('')
        let arr = []
        this.data.inputArr.forEach((item, index) => {
          arr.push(vals[index] || '')
        })
        const len = vals.length;
        this.setData({
          inputVal:arr,
          activeIndex:len > this.data.length ? this.data.length : len
        })
        if (len === this.data.length) {
          this.triggerEvent('complete', {
            value: val
          })
          this.setData({
            focus: false
          })
          wx.hideKeyboard()
        }
      }
    },
    onTap() {
      if (this.data.disabled) return;
      this.setData({
        focus:true
      })
      if (this.data.activeIndex === -1) {
        this.setData({
          activeIndex:0
        })
      }
      if (this.data.activeIndex === this.data.length) {
        this.setData({
          activeIndex: this.data.activeIndex - 1
        })
      }
      this.triggerEvent('focus', {})
    },
    onInput(e) {
      let value = e.detail.value;
      value = value.replace(/\s+/g, "")
      this.getVals(value)
      this.triggerEvent('input', {
        value
      })
    },
    onBlur(e) {
      let value = e.detail.value;
      value = value.replace(/\s+/g, "")
      this.setData({
        focus:false
      })
      if (!value) {
        this.setData({
          activeIndex:-1
        })
      }
      this.triggerEvent('blur', {
        value
      })
    },
    onConfirm(e) {
      this.setData({
        focus:false
      })
      wx.hideKeyboard()
      this.triggerEvent('confirm', e.detail)
    },
    clear() {
      this.setData({
        val:'',
        inputVal:[],
        activeIndex:-1
      },()=>{
        this.onTap()
      })
    }
  }
})
