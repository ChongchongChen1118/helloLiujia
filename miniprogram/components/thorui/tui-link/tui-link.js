Component({
  options: {
		virtualHost: true
	},
  properties: {
    href: {
      type: String,
      value: ''
    },
    text: {
      type: String,
      value: ''
    },
    download: {
      type: String,
      value: ''
    },
    underline: {
      type: Boolean,
      value: false
    },
    copyTips: {
      type: String,
      value: '链接已复制'
    },
    color: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 28
    },
    custom: {
      type: Boolean,
      value: false
    }
  },
  data:{
    g_color: (wx.$tui && wx.$tui.color.link) || '#586c94'
  },
  methods: {
    openURL() {
      wx.setClipboardData({
        data: this.data.href,
        success:(res)=> {
          wx.showToast({
            title: this.data.copyTips,
            icon: 'none'
          });
        }
      });
    }
  }
})
