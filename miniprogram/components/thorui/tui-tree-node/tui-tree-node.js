Component({
  options: {
    virtualHost: true
  },
  properties: {
    node: {
      type: Object,
      value: {},
      observer(val) {
        if (val.collapsed !== this.data.collapsed && val.children && val.children.length > 0) {
          this.setData({
            collapsed: val.collapsed
          })
        }
      }
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
  data: {
    collapsed: true
  },
  lifetimes: {
    attached: function () {
      let val = true
      if (this.data.node.collapsed === false) {
        val = false
      }
      this.setData({
        collapsed: val
      })
    }
  },
  methods: {
    handleClick: function (e) {
      if (this.data.collapsible && this.data.node.children && this.data.node.children.length > 0) {
        const val = this.data.collapsed || false
        this.setData({
          collapsed: !val
        })
      }
      this.triggerEvent('click', this.data.node)
    },
    nodeClick: function (e) {
      this.triggerEvent('click', e.detail)
    }
  }
})