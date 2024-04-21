Component({
  properties: {
    value: {
      type: String,
      value: 'copy text'
    },
    //需要复制的文本，默认空，则默认复制的值为value
    copyValue: {
      type: String,
      value: ''
    },
    //字体大小
    size: {
      type: Number,
      value: 28
    },
    //是否加粗
    bold: {
      type: Boolean,
      value: false
    },
    //字体颜色
    color: {
      type: String,
      value: '#333'
    },
    //选中后背景色
    backgroundColor: {
      type: String,
      value: 'transparent'
    },
    //是否显示复制tooltip，为false时，长按直接复制（无扩展buttons时生效）
    showCopyBtn: {
      type: Boolean,
      value: true
    },
    //复制按钮显示方向：top，left，right，bottom
    direction: {
      type: String,
      value: 'top'
    },
    //复制按钮z-index
    zIndex: {
      type: Number,
      value: 997
    },
    //使用系统长按操作，扩展按钮失效
    systemCopy: {
      type: Boolean,
      value: false
    },
    //是否移除复制按钮(当只需要扩展按钮时使用且有扩展按钮时生效)
    removeCopy: {
      type: Boolean,
      defavaluelt: false
    },
    //扩展按钮（1~3个左右）
    buttons: {
      type: Array,
      value:[]
    }
  },
  data: {
    showToolTip: false
  },
  methods: {
    handleCopy(e) {
			if (this.data.systemCopy) return;
			if (this.data.showCopyBtn || this.data.buttons.length > 0) {
        this.setData({
          showToolTip:true
        })
			} else {
				this.copy(e);
			}
		},
		copy(e) {
      wx.setClipboardData({
        data: this.data.copyValue || this.data.value,
        success(res) {
          wx.showToast({
            title: '复制成功',
            icon: 'none'
          });
        },
        fail(res) {
         console.log("复制失败")
        }
      })
			this.cancel();
		},
		cancel() {
      this.setData({
        showToolTip:false
      })
		},
		buttonTap(e) {
			let index = Number(e.currentTarget.dataset.index);
			this.triggerEvent('click', {
				index: index,
				value: this.data.value,
				copyValue: this.data.copyValue
			});
			this.cancel();
		}
  }
})