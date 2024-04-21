Component({
  options: {
    styleIsolation: 'isolated'
  },
  properties: {
    treeData: {
      type: Array,
      value: []
    },
    //是否可折叠（收起展开）
    collapsible: {
      type: Boolean,
      value: false
    },
    fields: {
      type: Array,
      value:['text', 'children']
    }
  },
  methods: {
    handleClick: function (e) {
      this.triggerEvent('click', e.detail)
    }
  }
})