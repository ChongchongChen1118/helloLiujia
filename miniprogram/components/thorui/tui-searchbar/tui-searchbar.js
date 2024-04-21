//默认高度52px
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //搜索栏背景色
    backgroundColor: {
      type: String,
      value: '#ededed'
    },
    //搜索栏padding
    padding: {
      type: String,
      value: '16rpx 20rpx'
    },
    //input框高度
    height: {
      type: String,
      value: '72rpx'
    },
    radius: {
      type: String,
      value: '8rpx'
    },
    //input框背景色
    inputBgColor: {
      type: String,
      value: '#fff'
    },
    focus: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: '请输入搜索关键词'
    },
    value: {
      type: String,
      value: '',
      observer(val) {
        this.setData({
          valueTxt: val
        })
      }
    },
    //input是否禁用
    disabled: {
      type: Boolean,
      value: false
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    cancelColor: {
      type: String,
      value: '#888'
    },
    cancel: {
      type: Boolean,
      value: true
    },
    searchText: {
      type: String,
      value: '搜索'
    },
    searchColor: {
      type: String,
      value: ''
    },
    //是否显示占位标签
    showLabel: {
      type: Boolean,
      value: true
    },
    //是否显示输入框
    showInput: {
      type: Boolean,
      value: true
    }
  },
  lifetimes: {
    attached: function () {
      const sys = wx.getSystemInfoSync()
      this.setData({
        valueTxt: this.data.value,
        isFocus: this.data.focus,
        clearSize:sys.windowWidth / 750 * 30,
        searchSize: sys.windowWidth / 750 * 26
      })
      if (this.data.focus || this.data.valueTxt.length > 0) {
        this.setData({
          searchState: true
        })
      }
    }
  },
  data: {
    searchState: false,
    isFocus: false,
    valueTxt: '',
    clearSize: 15,
    searchSize: 13,
    g_searchColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc'
  },
  methods: {
    clearInput() {
      this.setData({
        valueTxt: '',
        isFocus: true
      })
      this.triggerEvent('clear');
    },
    inputFocus(e) {
      if (!this.data.showLabel) {
        this.setData({
          searchState: true
        })
      }
      this.triggerEvent('focus', e.detail);
    },
    inputBlur(e) {
      this.setData({
        isFocus: false
      })
      this.triggerEvent('blur', e.detail);
    },
    tapShowInput() {
      if (!this.data.disabled && this.data.showInput) {
        this.setData({
          isFocus: true,
          searchState: true
        })
      }
      this.triggerEvent('click', {});
    },
    hideInput() {
      this.setData({
        searchState: false
      })
      this.triggerEvent('cancel', {});
    },
    inputChange(e) {
      this.setData({
        valueTxt: e.detail.value
      })
      this.triggerEvent('input', e.detail);
    },
    search() {
      this.triggerEvent('search', {
        value: this.data.valueTxt
      });
    },
    reset() {
      this.setData({
        searchState: false,
        valueTxt: '',
        isFocus: false
      })
    }
  }
})