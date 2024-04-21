Component({
  options:{
    addGlobalClass: true,
    virtualHost: true
  },
  properties: {
    treeData: {
      type: Array,
      value:[],
      observer(vals){
        this.initData()
      }
    },
    fields: {
      type: Array,
      value:['text', 'children']
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 80,
      observer(val){
        this.initData()
      }
    },
    padding: {
      type: String,
      optionalTypes:[Number],
      value: 24
    },
    radius: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    background: {
      type: String,
      value: '#fff'
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 32
    },
    color: {
      type: String,
      value: '#000'
    },
    borderColor: {
      type: String,
      value: '#555'
    },
    lineWidth: {
      type: String,
      optionalTypes:[Number],
      value: 88
    },
    lineColor: {
      type: String,
      value: '#555'
    },
    //调整内容上下间距
    gap: {
      type: String,
      optionalTypes:[Number],
      value: 40
    },
    //组件内部使用属性，不可修改，主要用于区分组件递归样式问题
    root: {
      type: Boolean,
      value: true
    }
  },
  data: {
    options: [],
    itemHeight: 0
  },
  lifetimes:{
    attached:function(){
      this.initData()
    }
  },
  methods: {
    initData() {
      this.setData({
        itemHeight:this.toPx(this.data.height)
      })
      const options = this.data.treeData.map((item, index) => {
        return {
          isOrgRoot: index === 0 && this.data.root,
          ...this.adjustItem(item)
        };
      });
      this.setData({
        options: options
      })
    },
    toPx(rpx) {
      let sys = wx.getSystemInfoSync()
      let px =  sys.windowWidth / 750 * rpx
      return px % 2 === 0 ? px : px + 1
    },
    adjustItem(item) {
      let children = item[this.data.fields[1] || 'children'];
      if (!children || children.length == 0) {
        item.height = this.data.itemHeight + this.toPx(this.data.gap);
      } else {
        children.map(model => {
          this.adjustItem(model);
        });

        item.height = children.reduce((preV, n) => {
          return preV + n.height;
        }, 0);
      }
      return item;
    },
    onClick(e){
       const item = e.currentTarget.dataset.item
       this.triggerEvent('click', {
         ...item
       })
    },
    handleClick(e) {
      this.triggerEvent('click', e.detail)
    }
  }
})
