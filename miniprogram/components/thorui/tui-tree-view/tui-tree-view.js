Component({
  properties: {
    treeData: {
      type: Array,
      value: []
    },
    //是否可折叠
    collapsible: {
      type: Boolean,
      value: true
    },
    //是否显示三角箭头
    triangle: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    handleClick: function (e) {
      this.triggerEvent('click', e.detail)
    }
  }
})