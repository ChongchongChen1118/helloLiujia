Component({
  externalClasses: ['tui-alert-class'],
  properties: {
    //控制显示
    show: {
      type: Boolean,
      value: false
    },
    //提示信息字体大小
    size: {
      type: Number,
      value: 30
    },
    //提示信息字体颜色
    color: {
      type: String,
      value: "#333"
    },
    //按钮字体颜色
    btnColor: {
      type: String,
      value: ""
    },
    btnText: {
      type: String,
      value: "确定"
    },
    //点击遮罩 是否可关闭
    maskClosable: {
      type: Boolean,
      value: false
    }
  },
  data:{
    g_btnColor: wx.$tui && wx.$tui.color.danger
  },
  methods: {
    handleClick(e) {
      if (!this.data.show) return;
      this.triggerEvent('click', {});
    },
    handleClickCancel() {
      if (!this.data.maskClosable) return;
      this.triggerEvent('cancel', {});
    }
  }
})