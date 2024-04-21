Component({
  options: {
    multipleSlots: true
  },
  properties: {
    padding: {
      type: String,
      value: ''
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
    label: {
      type: String,
      value: ''
    },
    labelSize: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    labelColor: {
      type: String,
      value: ''
    },
    //V2.3.0+
    labelFontWeight:{
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    labelWidth: {
      type: String,
      optionalTypes:[Number],
      value: 140
    },
    labelRight: {
      type: String,
      optionalTypes:[Number],
      value: 16
    },
    asterisk: {
      type: Boolean,
      value: false
    },
    asteriskColor: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    highlight: {
      type: Boolean,
      value: false
    },
    arrow: {
      type: Boolean,
      value: false
    },
    arrowColor: {
      type: String,
      value: ''
    },
    bottomBorder: {
      type: Boolean,
      value: true
    },
    borderColor: {
      type: String,
      value: ''
    },
    left: {
      type: String,
      optionalTypes:[Number],
      value: 30
    },
    right: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    radius: {
      type: String,
      value: ''
    },
    index: {
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  },
  data:{
    g_padding:(wx.$tui && wx.$tui.tuiFormItem.padding) || '26rpx 30rpx',
    g_background:(wx.$tui && wx.$tui.tuiFormItem.background) || '#fff',
    g_radius: (wx.$tui && wx.$tui.tuiFormItem.radius) || '0',
    g_asteriskColor:(wx.$tui && wx.$tui.tuiFormItem.asteriskColor) || '#EB0909',
    g_arrowColor:(wx.$tui && wx.$tui.tuiFormItem.arrowColor) || '#c0c0c0',
    g_borderColor:(wx.$tui && wx.$tui.tuiFormItem.borderColor) || '#eaeef1',
    g_labelSize:(wx.$tui && wx.$tui.tuiFormItem.labelSize) || 32,
    g_labelColor:(wx.$tui && wx.$tui.tuiFormItem.labelColor) || '#333',
    g_labelFontWeight:(wx.$tui && wx.$tui.tuiFormItem.labelFontWeight) || 400
  },
  methods: {
    handleClick() {
      this.triggerEvent('click', {
        index: this.data.index
      });
    }
  }
})
