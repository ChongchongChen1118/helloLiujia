Component({
  options: {
    virtualHost: true
  },
  properties: {
    value: {
      type: String,
      value: ''
    },
    checked: {
      type: Boolean,
      value: false,
      observer(newVal) {
        this.setData({
          val: newVal
        },()=>{
          if(this.data.triggerGroup){
            this.groupChangeValue()
          }
        })
      }
    },
    //当设置checked 属性值时是否触发父级change方法
    triggerGroup: {
      type: Boolean,
      value: true
    },
    disabled: {
      type: Boolean,
      value: false
    },
    //checkbox选中背景颜色
    color: {
      type: String,
      value: '#5677fc'
    },
    //checkbox未选中时边框颜色
    borderColor: {
      type: String,
      value: '#ccc'
    },
    //是否只展示对号，无边框背景
    isCheckMark: {
      type: Boolean,
      value: false
    },
    //对号颜色
    checkMarkColor: {
      type: String,
      value: '#fff'
    },
    scaleRatio: {
      type: Number,
      optionalTypes: [String],
      value: 1
    }
  },
  relations: {
    '../tui-checkbox-group/tui-checkbox-group': {
      type: 'ancestor'
    },
    '../tui-label/tui-label': {
      type: 'ancestor'
    }
  },
  lifetimes: {
    attached: function () {
      this.setData({
        val: this.data.checked
      },()=>{
        this.data.triggerGroup && this.groupChangeValue()
      })
    }
  },
  data: {
    val: false
  },
  methods: {
    checkboxChange(e) {
      if (this.data.disabled) return;
      this.setData({
        val: !this.data.val
      }, () => {
        this.groupChangeValue()
        this.triggerEvent('change', {
          checked: this.data.val,
          value: this.data.value
        })
      })
    },
    groupChangeValue(){
      const group = this.getRelationNodes('../tui-checkbox-group/tui-checkbox-group')[0]
      group && group.changeValue(this.data.val, this);
    },
    labelClick() {
      this.checkboxChange()
    }
  }
})