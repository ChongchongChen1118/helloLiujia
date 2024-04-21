Component({
  properties: {
    /*
			  数据源
			  约定属性 fixed（是否固定，表示此内容不可拖拽，也不可换位置）
			*/
    listData: {
      type: Array,
      value: [],
      observer(val){
        this.setData({
          list:[]
        })
				setTimeout(() => {
          this.init()
				}, 1);
      }
    },
    // 列数
    columns: {
      type: Number,
      value: 3,
      observer(val){
        this.setData({
          list:[]
        })
				setTimeout(() => {
          this.init()
				}, 1);
      }
    },
    // 顶部固定高度
    topSize: {
      type: Number,
      value: 0
    },
    // 底部固定高度
    bottomSize: {
      type: Number,
      value: 0
    },
    // 每个 item 高度, 用于计算 item-wrap 高度 rpx
    itemHeight: {
      type: Number,
      value: 0
    },
    // 页面滚动高度
    scrollTop: {
      type: Number,
      value: 0
    },
    //编辑状态：为true时才可拖拽
    isEdit: {
      type: Boolean,
      value: true
    }
  },
  data: {
    baseData: {},
    platform: '', 
    listWxs: [], 
    rows: 4, 
    list: [],
    dragging: false
  },
  lifetimes:{
    attached:function(){
      this.init();
    }
  },
  methods: {
    vibrate() {
      if (this.data.platform !== 'devtools') wx.vibrateShort();
    },
    pageScroll(e) {
      wx.pageScrollTo({
        scrollTop: e.scrollTop,
        duration:0
      });
    },
    drag(e) {
      this.setData({
        dragging:e.dragging
      })
    },
    listChange(e) {
      this.setData({
        listWxs:e.list
      })
    },
    itemClick(e) {
      let index = e.currentTarget.dataset.index;
      let item = this.data.listWxs[index];

      this.triggerEvent('click', {
        key: item.realKey,
        data: item.data,
        extra: e.detail
      });
    },
    unique(n = 6) {
      let rnd = '';
      for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
      return 'tui_' + new Date().getTime() + rnd;
    },
    /**
     *  初始化获取 dom 信息
     */
    initDom() {
      let {
        windowWidth,
        windowHeight,
        platform
      } = wx.getSystemInfoSync();
      let remScale = (windowWidth || 375) / 375;

      this.data.platform=platform;

      let baseData = {};
      baseData.windowHeight = windowHeight;
      baseData.realTopSize = (this.data.topSize * remScale) / 2;
      baseData.realBottomSize = (this.data.bottomSize * remScale) / 2;
      baseData.columns = this.data.columns;
      baseData.rows = this.data.rows;

      const query = wx.createSelectorQuery().in(this);
      query.select('.tui-drag__item').boundingClientRect();
      query.select('.tui-drag__wrap').boundingClientRect();
      query.exec(res => {
        if (res && res.length > 0 && res[0] && res[0].width) {
          baseData.itemWidth = res[0].width;
          baseData.itemHeight = res[0].height;
          baseData.wrapLeft = res[1].left;
          baseData.wrapTop = res[1].top + this.data.scrollTop;
          this.setData({
            dragging:false,
            baseData:baseData
          })
        }
      });
    },
    /**
     *  初始化函数
     *  {listData, topSize, bottomSize, itemHeight} 参数改变需要手动调用初始化方法
     */
    init() {
      // 初始必须为true以绑定wxs中的函数,
      this.setData({
        dragging:true
      })
      let delItem = item => {
        let obj={...item}
        let fixed = obj.fixed || false;
        delete obj["fixed"];
        return {
          id: this.unique(),
          fixed: fixed,
          data: { 
            ...obj
          }
        };
      };
      let listData = this.data.listData,
        _list = [];
      // 遍历数据源增加扩展项, 以用作排序使用
      listData.forEach((item, index) => {
        _list.push(delItem(item));
      });

      let i = 0,
        columns = this.data.columns;
      let list = (_list || []).map((item, index) => {
        item.realKey = i++; // 真实顺序
        item.sortKey = index; // 整体顺序
        item.tranX = `${(item.sortKey % columns) * 100}%`;
        item.tranY = `${Math.floor(item.sortKey / columns) * 100}%`;
        return item;
      });
      this.setData({
        rows:Math.ceil(list.length / columns),
        list:list,
        listWxs:list
      })
      if (list.length === 0) return;

      // 异步加载数据时候, 延迟执行 initDom 方法, 防止无法正确获取 dom 信息
      setTimeout(() => this.initDom(), 1000);
    },
    sort_end(e) {
      this.triggerEvent('sortend', {
        listData: e.listData
      });
    },
    change(e) {
      this.triggerEvent('change', {
        listData: e.listData
      });
    },
    handleClick(e){
      this.triggerEvent('click',{value: e.detail})
    }
  }
})