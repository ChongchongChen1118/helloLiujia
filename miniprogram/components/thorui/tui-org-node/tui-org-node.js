Component({
  options: {
    virtualHost: true
  },
  properties: {
    node: {
      type: Object,
      value: {},
      observer(val) {
        if (val.collapsed !== this.data.collapsed && this.data.node[[this.data.fields[1] || 'children']] && this.data.node[this.data.fields[1] || 'children'].length > 0) {
          this.setData({
            collapsed: val.collapsed || false
          })
        }
      }
    },
    //是否可折叠
    collapsible: {
      type: Boolean,
      value: false
    },
    fields: {
      type: Array,
      value:['text', 'children']
    }
  },
  lifetimes: {
    attached: function () {
      this.setData({
        collapsed: this.data.node.collapsed || false
      })
    }
  },
  data: {
    collapsed: false
  },
  methods: {
    handleClick: function (e) {
      if (this.data.collapsible && this.data.node[this.data.fields[1] || 'children'] && this.data.node[this.data.fields[1] || 'children'].length > 0) {
        this.setData({
          collapsed: !this.data.collapsed
        })
      }
      this.triggerEvent('click', this.data.node)
    },
    nodeClick: function (e) {
      this.triggerEvent('click', e.detail)
    }
  }
})