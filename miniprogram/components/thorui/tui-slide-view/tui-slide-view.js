
Component({
  properties: {
    buttons: {
      type: Array,
      value: [{
        text: '删除',
        color: '#fff',
        src: '', // img地址
        width: '', //img 宽
        height: '', //img 高
        background: (wx.$tui && wx.$tui.color.pink) || '#f74d54'
      }]
    },
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: '100%'
    },
    padding: {
      type: String,
      value: '0 30rpx'
    },
    radius: {
      type: String,
      value: '0'
    },
    fontSize: {
      type: Number,
      optionalTypes:[String],
      value: 32
    },
    disable: {
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      value: false,
      observer(val){
        this.setData({
          shown:val,
          zIndex:val ? 99 : 9
        })
      }
    },
    duration: {
      type: Number,
      value: 350
    },
    //滑动多少距离菜单展开
    throttle: {
      type: Number,
      value: 30
    },
    showMask: {
      type: Boolean,
      value: false
    },
    marginTop:{
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    marginBottom:{
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  },
  data: {
    size: null,
    rebounce: 0, //回弹距离，暂时废弃
    shown: false,
    zIndex: 9
  },
  lifetimes:{
    attached:function(){
      this.setData({
        shown:this.data.show
      })
    },
    ready:function(){
      this.updateRight();
    }
  },
  methods: {
    updateRight() {
      // 获取右侧滑动显示区域的宽度
      const query = wx.createSelectorQuery().in(this);
      query.select('.tui_wxs_left').boundingClientRect(res => {
        const btnQuery = wx.createSelectorQuery().in(this);
        btnQuery.selectAll('.tui_wxs_btn').boundingClientRect(rects => {
          let size = {
            buttons: rects,
            button: res,
            show: this.data.shown,
            disable: this.data.disable,
            throttle: this.data.throttle,
            rebounce: this.data.rebounce,
            duration: this.data.duration
          }
          this.setData({
            size:size
          })
         
        }).exec();
      }).exec();
    },
    buttonTapByWxs(data) {
      this.setData({
        shown:false,
        zIndex:9
      })
      this.triggerEvent('click', data);
    },
    hideButton() {
      this.setData({
        shown:false,
        zIndex:9
      })
      this.triggerEvent('close', {});
    },
    showButton() {
      this.setData({
        shown:true,
        zIndex:99
      })
      this.triggerEvent('open', {});
    },

    transitionEnd() {},
    closeButtonGroup() {
      this.hideButton()
    }
  }
})
