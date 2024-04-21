Component({
  properties: {
    options: {
      type: Array,
      value:[],
      observer(vals){
        this.initData(vals)
      }
    },
    value: {
      type: Array,
      optionalTypes:[String,Number],
      value:[],
      observer(vals){
        this.modelChange(vals)
      }
    },
    multiple: {
      type: Boolean,
      value: false
    },
    //最小选择数，仅单选时有效，可选值0、1
    min: {
      type: String,
      optionalTypes:[Number],
      value: 1
    },
    //最大选择数
    max: {
      type: String,
      optionalTypes:[Number],
      value: -1
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    padding: {
      type: String,
      value: '20rpx 32rpx'
    },
    gap: {
      type: String,
      optionalTypes:[Number],
      value: 20
    },
    radius: {
      type: String,
      value: '8rpx'
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 24
    },
    color: {
      type: String,
      value: '#333'
    },
    activeColor: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: '#fff'
    },
    activeBgColor: {
      type: String,
      value: 'rgba(86, 119, 252, 0.1)'
    },
    defaultBorderColor: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      value: ''
    }
  },
  lifetimes:{
    attached:function(){
      this.initData(this.data.options)
    }
  },
  data: {
    itemList: [],
    singleVal: '',
    vals: [],
    g_activeColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc',
    g_borderColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc'
  },
  methods: {
    initData(vals) {
      vals = JSON.parse(JSON.stringify(vals))
      if (vals && vals.length > 0) {
        if (typeof vals[0] !== 'object') {
          vals = vals.map((item, index) => {
            return {
              text: item,
              value: item,
              checked: false
            }
          })
        } else {
          vals.map((item, index) => {
            item.checked = false
            if (item.value === undefined) {
              item.value = item.text
            }
          })
        }
        this.setData({
          itemList:vals
        })
        this.modelChange(this.data.value)
      }
    },
    emitsChange(e) {
      this.triggerEvent('change', e)
      let val = Array.isArray(e.value) ? JSON.stringify(e.value) : e.value
      this.setData({
        value: val
      })
    },
    radioChange(index, model) {
      let min = Number(this.data.min)
      if (this.data.singleVal === model.value && min > 0) return;
      let val = '';
      let i = index
      this.data.itemList.forEach((item, idx) => {
        if (idx === index) {
          const bool = this.data.singleVal === item.value && min <= 0
          val = bool ? '' : item.value
          i = bool ? -1 : index
          item.checked = bool ? false : true
        } else {
          item.checked = false
        }
      })
      this.setData({
        itemList: this.data.itemList,
        singleVal:val
      })
      let e = {
        index: i,
        value: val
      }
      this.emitsChange(e)
    },
    checkboxChange(index, model) {
      let max = Number(this.data.max)
      let vals = this.data.vals
      let i = vals.indexOf(model.value)
      if (vals.length >= max && max !== -1 && i === -1) {
        wx.showToast({
          title: '已超出最大选择数！',
          icon: 'none'
        })
        return
      }
      this.data.itemList.forEach((item, idx) => {
        if (idx === index) {
          item.checked = i !== -1 ? false : true
          if (item.checked) {
            vals.push(item.value)
          } else {
            vals.splice(i, 1)
          }
        }
      })
      this.setData({
        itemList: this.data.itemList,
        vals:vals
      })
      let e = {
        value: vals
      }
      this.emitsChange(e)
    },
    itemTap(e) {
      let index = Number(e.currentTarget.dataset.index)
      let item = this.data.itemList[index]
      if (item.disable) return;
      if (this.data.multiple) {
        this.checkboxChange(index, item)
      } else {
        this.radioChange(index, item)
      }
    },
    modelChange(vals) {
      if (this.data.multiple) {
        vals = typeof vals === 'string' ? JSON.parse(vals) : vals;
        this.data.itemList.forEach(item => {
          if (vals.includes(item.value)) {
            item.checked = true;
          } else {
            item.checked = false
          }
        })
        this.setData({
          itemList:  this.data.itemList,
          vals:vals
        })
      } else {
        this.data.itemList.forEach(item => {
          if (vals == item.value) {
            item.checked = true;
          } else {
            item.checked = false
          }
        })
        this.setData({
          itemList: this.data.itemList,
          singleVal:vals
        })
      }
    }
  }
})
