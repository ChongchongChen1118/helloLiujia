Component({
  properties: {
    //图片路径
    src: {
      type: String,
      value: ''
    },
    //占位图路径
    placeholder: {
      type: String,
      value: ''
    },
    //占位背景色，placeholder有值时失效
    backgroundColor: {
      type: String,
      value: '#E7E7E7'
    },
    //图片的裁剪模式，参考image组件mode属性
    mode: {
      type: String,
      value: 'widthFix'
    },
    //图片显示动画效果,无占位图时有效
    fadeShow: {
      type: Boolean,
      value: true
    },
    //默认不解析 webP 格式，只支持网络资源 微信小程序2.9.0
    webp: {
      type: Boolean,
      value: false
    },
    //开启长按图片显示识别小程序码菜单 微信小程序2.7.0
    showMenuByLongpress: {
      type: Boolean,
      value: false
    },
    //鼠标长按是否能拖动图片 仅H5平台 3.1.1+ 有效
    draggable: {
      type: Boolean,
      value: true
    },
    //图片宽度
    width: {
      type: String,
      value: '340rpx'
    },
    //图片高度，如果高度设置为auto，mode值需要设置为widthFix
    height: {
      type: String,
      value: '340rpx'
    },
    //图片圆角值，如：10rpx
    radius: {
      type: String,
      value: '0'
    },
    //节点布局区域的下边界,目标节点区域以下 bottom(px) 时，就会触发回调函数
    bottom: {
      type: Number,
      optionalTypes:[String],
      value: 50
    },
    //是否停止监听，回调函数将不再触发
    disconnect: {
      type: Boolean,
      value: false,
      observer(val) {
        if (val) {
          this.removeObserver()
        }
      }
    },
    //图片在列表中的索引值
    index: {
      type: Number,
      value: 0
    }
  },
  data: {
    show: false,
    observer: null,
    uid: null
  },
  lifetimes: {
    attached: function (e) {
      this.setData({
        uid: this.unique() + this.data.index
      })
    },
    ready: function (e) {
      if (!this.data.disconnect) {
        this.initObserver()
      } else {
        this.setData({
          show: true
        })
      }
    },
    detached: function (e) {
      this.removeObserver()
    }
  },
  methods: {
    unique: function (n) {
      n = n || 6;
      let rnd = '';
      for (let i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
      return 'tui_' + new Date().getTime() + rnd;
    },
    removeObserver() {
      if (this.data.observer) {
        this.data.observer.disconnect()
        this.data.observer = null;
      }
    },
    initObserver() {
      if (this.data.observer || this.data.show) return;
      try {
        let element = this.data.uid ? `#${this.data.uid}` : '.tui-lazyload__img';
        const observer = this.createIntersectionObserver;
        observer.relativeToViewport({
          bottom: Number(this.data.bottom)
        }).observe(element, (res) => {
          if (res.intersectionRatio > 0 && !this.data.show) {
            this.setData({
              show: true
            })
            this.removeObserver()
          }
        })
        this.data.observer = observer
      } catch (e) {
        //TODO handle the exception
        this.setData({
          show: true
        })
      }
    },
    error(e) {
      if (!this.data.show) return;
      this.triggerEvent('error', {
        detail: e.detail,
        index: this.data.index
      })
    },
    load(e) {
      if (!this.data.show) return;
      this.triggerEvent('load', {
        detail: e.detail,
        index: this.data.index
      })
    },
    handleClick(e) {
      this.triggerEvent('click', {
        index: this.data.index
      })
    }
  }
})