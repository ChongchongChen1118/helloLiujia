Component({
  options: {
    multipleSlots: true,
    virtualHost: true
  },
  properties: {
    //样式：primary，success， warning，danger，gray，black，white
    type: {
      type: String,
      value: '',
      observer(val){
        this.getColor()
      }
    },
    text: {
      type: String,
      optionalTypes:[Number],
      value: ''
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    unit: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: '',
      observer(val){
        this.getColor()
      }
    },
    fontWeight: {
      type: String,
      optionalTypes:[Number],
      value: 400
    },
    //left、center、right
    align: {
      type: String,
      value: 'left'
    },
    //none、 underline、line-through
    decoration: {
      type: String,
      value: 'none'
    },
    lineHeight: {
      type: Boolean,
      value: false
    },
    padding: {
      type: String,
      value: '0'
    },
    block: {
      type: Boolean,
      value: false
    },
    textType: {
      type: String,
      value: 'text'
    },
    format: {
      type: Boolean,
      value: false
    },
    call: {
      type: Boolean,
      value: false
    },
    selectable: {
      type: Boolean,
      value: false
    },
    userSelect: {
      type: Boolean,
      value: false
    },
    decode: {
      type: Boolean,
      value: false
    },
    highlight: {
      type: Boolean,
      value: false
    },
    unShrink:{
      type: Boolean,
      value: false
    },
    disable: {
      type: Boolean,
      value: false
    }
  },
  data:{
    text_color:'',
    g_unit:(wx.$tui && wx.$tui.tuiText.unit) || 'rpx',
    g_size:(wx.$tui && wx.$tui.tuiText.size) || 32
  },
  lifetimes:{
    attached:function(){
      this.getColor()
    }
  },
  methods: {
    getColor() {
      let color = this.data.color;
      if (!color && this.data.type) {
        const global = wx.$tui && wx.$tui.color;
        color = {
          primary: (global && global.primary) || '#5677fc',
          success: (global && global.success) || '#07c160',
          warning: (global && global.warning) || '#ff7900',
          danger: (global && global.danger) || '#EB0909',
          gray: '#999',
          black: '#333',
          white: '#fff'
        } [this.data.type]
      }
      if (!color && !this.data.type) {
        color = (wx.$tui && wx.$tui.tuiText.color) || '#333';
      }
       this.setData({
         text_color: color
       })
    },
    handleClick() {
      if (this.data.disable) return;
      this.triggerEvent('click', {
        text: this.data.text
      })
      if (this.data.call) {
        wx.makePhoneCall({
          phoneNumber: this.data.text
        })
      }
    }
  }
})
