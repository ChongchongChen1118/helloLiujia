let ColorUtil = {
  rgbToHex(r, g, b) {
    let hex = ((r << 16) | (g << 8) | b).toString(16);
    return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
  },
  hexToRgb(hex) {
    let rgb = [];
    if (hex.length === 4) {
      let text = hex.substring(1, 4);
      hex = '#' + text + text;
    }
    for (let i = 1; i < 7; i += 2) {
      rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
    }
    return rgb;
  },
  /**
   * 生成渐变过渡色数组 {startColor: 开始颜色值, endColor: 结束颜色值, step: 生成色值数组长度}
   */
  gradient(startColor, endColor, step) {
    // 将hex转换为rgb
    let sColor = this.hexToRgb(startColor),
      eColor = this.hexToRgb(endColor);

    // 计算R\G\B每一步的差值
    let rStep = (eColor[0] - sColor[0]) / step,
      gStep = (eColor[1] - sColor[1]) / step,
      bStep = (eColor[2] - sColor[2]) / step;

    let gradientColorArr = [];
    for (let i = 0; i < step; i++) {
      // 计算每一步的hex值
      gradientColorArr.push(this.rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(
        bStep * i + sColor[2])));
    }
    return gradientColorArr;
  },
  /**
   * 生成随机颜色值
   */
  generateColor() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += (Math.random() * 16 | 0).toString(16);
    }
    return color;
  }
}
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    // 数据源
    listData: {
      type: Array,
      value: [],
      observer(val) {
        this.init()
      }
    },
    // 顶部高度
    top: {
      type: Number,
      value: 0,
      observer(val) {
        this.init()
      }
    },
    // 底部高度
    bottom: {
      type: Number,
      value: 0,
      observer(val) {
        this.init()
      }
    },
    //top和bottom单位，可传rpx 或 px
    unit: {
      type: String,
      value: 'px'
    },
    //sticky letter 是否显示上边线条
    topLine: {
      type: Boolean,
      value: true
    },
    //sticky letter 是否显示下边线条
    bottomLine: {
      type: Boolean,
      value: true
    },
    height: {
      type: String,
      value: '60rpx'
    },
    color: {
      type: String,
      value: '#666'
    },
    activeColor: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: '26rpx'
    },
    background: {
      type: String,
      value: '#ededed'
    },
    activeBackground: {
      type: String,
      value: '#FFFFFF'
    },
    padding: {
      type: String,
      value: '0 20rpx'
    },
    keyColor: {
      type: String,
      value: '#666'
    },
    activeKeyColor: {
      type: String,
      value: '#FFFFFF'
    },
    activeKeyBackground: {
      type: String,
      value: ''
    },
    //重新初始化[可异步加载时使用,设置大于0的数]
    reinit: {
      type: Number,
      value: 0,
      observer(val) {
        this.init()
      }
    }
  },
  data: {
    remScale: 1, // 缩放比例
    realTop: 0, // 计算后顶部高度实际值
    realBottom: 0, // 计算后底部高度实际值
    treeInfo: {
      // 索引树节点信息
      treeTop: 0,
      treeBottom: 0,
      itemHeight: 0,
      itemMount: 0
    },
    indicatorTopList: [], // 指示器节点信息列表
    maxScrollTop: 0, // 最大滚动高度
    blocks: [], // 节点组信息

    /* 渲染数据 */
    treeItemCur: -1, // 索引树的聚焦项
    listItemCur: -1, // 节点树的聚焦项
    touching: false, // 是否在触摸索引树中
    scrollTop: 0, // 节点树滚动高度
    indicatorTop: -1, // 指示器顶部距离
    treeKeyTran: false,
    background_cur: '',
    color_cur: '',
    background_next: '',
    color_next: '',
    colors: [],
    backgroundColors: [],
    g_activeColor:(wx.$tui && wx.$tui.color.primary) || '#5677fc',
    g_activeKeyBackground:(wx.$tui && wx.$tui.color.primary) || '#5677fc'
  },
  methods: {
    /**
     * 点击每一项后触发事件
     */
    itemClick(e) {
      let {
        index,
        subi
      } = e.currentTarget.dataset;
      let data = this.data.listData[index].data[subi];
      this.triggerEvent('click', data);
    },
    /**
     * scroll-view 滚动监听
     */
    scroll(e) {
      if (this.data.touching) return;

      let scrollTop = e.detail.scrollTop;
      if (scrollTop > this.data.maxScrollTop) return;

      let blocks = this.data.blocks,
        stickyTitleHeight = this.data.remScale * 30;
      let len = blocks.length - 1;
      for (let i = len; i >= 0; i--) {
        let block = blocks[i];
        // 判断当前滚动值 scrollTop 所在区间, 以得到当前聚焦项
        if (scrollTop >= block.itemTop && scrollTop < block.itemBottom) {
          // 判断当前滚动值 scrollTop 是否在当前聚焦项底一个 .tui-content__title 高度范围内, 如果是则开启过度色值计算
          if (scrollTop > block.itemBottom - stickyTitleHeight) {
            let percent = Math.floor(((scrollTop - (block.itemBottom - stickyTitleHeight)) / stickyTitleHeight) * 100);
            this.setData({
              background_cur: this.data.backgroundColors[percent],
              color_cur: this.data.colors[percent],
              background_next: this.data.backgroundColors[100 - percent],
              color_next: this.data.colors[100 - percent],
              treeItemCur: i,
              listItemCur: i
            })
          } else if (scrollTop <= block.itemBottom - stickyTitleHeight) {
            this.setData({
              background_cur: this.data.activeBackground || this.data.g_activeKeyBackground,
              color_cur: this.data.activeColor || this.data.g_activeColor,
              background_next: this.data.background,
              color_next: this.data.color,
              treeItemCur: i,
              listItemCur: i
            })
          }
          break;
        }
      }
    },
    /**
     * tree 触摸开始
     */
    touchStart(e) {
      // 获取触摸点信息
      let startTouch = e.changedTouches[0];
      if (!startTouch) return;
      this.setData({
        touching: true
      })
      let treeItemCur = this.getCurrentTreeItem(startTouch.pageY);
      this.triggerEvent('letterClick',{
        index:treeItemCur,
        letter:this.data.listData[treeItemCur].letter
      })
      this.setValue(treeItemCur);
    },
    /**
     * tree 触摸移动
     */
    touchMove(e) {
      // 获取触摸点信息
      let currentTouch = e.changedTouches[0];
      if (!currentTouch) return;

      // 滑动结束后迅速开始第二次滑动时候 touching 为 false 造成不显示 indicator 问题
      if (!this.data.touching) {
        this.setData({
          touching: true
        })
      }

      let treeItemCur = this.getCurrentTreeItem(currentTouch.pageY);
      this.setValue(treeItemCur);
    },
    /**
     * tree 触摸结束
     */
    touchEnd(e) {
      let treeItemCur = this.data.treeItemCur;
      let listItemCur = this.data.listItemCur;
      if (treeItemCur !== listItemCur) {
        this.setData({
          treeItemCur: listItemCur,
          indicatorTop: this.data.indicatorTopList[treeItemCur]
        })
      }
      this.setData({
        treeKeyTran: true
      })
      setTimeout(() => {
        this.setData({
          touching: false,
          treeKeyTran: false
        })
      }, 300);
    },
    /**
     * 获取当前触摸的 tree-item
     * @param pageY: 当前触摸点pageY
     */
    getCurrentTreeItem(pageY) {
      let {
        treeTop,
        treeBottom,
        itemHeight,
        itemMount
      } = this.data.treeInfo;

      if (pageY < treeTop) {
        return 0;
      } else if (pageY >= treeBottom) {
        return itemMount - 1;
      } else {
        return Math.floor((pageY - treeTop) / itemHeight);
      }
    },
    /**
     * 触摸之后后设置对应value
     */
    setValue(treeItemCur) {
      if (treeItemCur === this.data.treeItemCur) return;

      let block = this.data.blocks[treeItemCur];
      if (!block) return;

      let {
        scrollTop,
        scrollIndex
      } = block,
      indicatorTop = this.data.indicatorTopList[treeItemCur];

      this.setData({
        background_cur: this.data.activeBackground || this.data.g_activeKeyBackground,
        color_cur: this.data.activeColor || this.data.g_activeColor,
        background_next: this.data.background,
        color_next: this.data.color,
        treeItemCur: treeItemCur,
        scrollTop: scrollTop,
        listItemCur: scrollIndex,
        indicatorTop: indicatorTop
      })

    },
    /**
     * 清除参数
     */
    clearData() {
      this.setData({
        treeItemCur: 0,
        listItemCur: 0,
        touching: false,
        scrollTop: 0,
        indicatorTop: -1,
        treeKeyTran: false,
        background_cur: this.data.background,
        color_cur: this.data.color,
        background_next: this.data.background,
        color_next: this.data.color
      })
    },
    /**
     *  初始化获取 dom 信息
     */
    initDom() {
      let {
        windowHeight,
        windowWidth
      } = wx.getSystemInfoSync();
      let remScale = (windowWidth || 375) / 375,
        realTop = (this.data.top * remScale) / 2,
        realBottom = (this.data.bottom * remScale) / 2,
        colors = ColorUtil.gradient(this.data.activeColor, this.data.color, 100),
        backgroundColors = ColorUtil.gradient(this.data.activeBackground || this.data.g_activeKeyBackground, this.data.background, 100);

      this.setData({
        remScale: remScale,
        realTop: realTop,
        realBottom: realBottom,
        colors: colors,
        backgroundColors: backgroundColors
      })
      wx.createSelectorQuery()
        .in(this)
        .select('#tui_index__letter')
        .boundingClientRect(res => {
          let treeTop = res.top,
            treeBottom = res.top + res.height,
            itemHeight = res.height / this.data.listData.length,
            itemMount = this.data.listData.length;

          let indicatorTopList = this.data.listData.map((item, index) => {
            return itemHeight / 2 + index * itemHeight + treeTop - remScale * 25;
          });
          let treeInfo = {
            treeTop: treeTop,
            treeBottom: treeBottom,
            itemHeight: itemHeight,
            itemMount: itemMount
          };
          this.setData({
            treeInfo: treeInfo,
            indicatorTopList: indicatorTopList
          })
        })
        .exec();

      wx.createSelectorQuery()
        .in(this)
        .select('.tui-content__box')
        .boundingClientRect(res => {
          let maxScrollTop = res.height - (windowHeight - realTop - realBottom);

          wx.createSelectorQuery()
            .in(this)
            .selectAll('.tui-item__select')
            .boundingClientRect(res => {
              let maxScrollIndex = -1;

              let blocks = res.map((item, index) => {
                // Math.ceil 向上取整, 防止索引树切换列表时候造成真机固定头部上边线显示过粗问题
                let itemTop = Math.ceil(item.top - realTop),
                  itemBottom = Math.ceil(itemTop + item.height);

                if (maxScrollTop >= itemTop && maxScrollTop < itemBottom) maxScrollIndex = index;

                return {
                  itemTop: itemTop,
                  itemBottom: itemBottom,
                  scrollTop: itemTop >= maxScrollTop ? maxScrollTop : itemTop,
                  scrollIndex: maxScrollIndex === -1 ? index : maxScrollIndex
                };
              });

              this.setData({
                maxScrollTop: maxScrollTop,
                blocks: blocks
              })
            })
            .exec();
        })
        .exec();
    },
    /**
     *  初始化
     */
    init() {
      this.clearData();
      // 避免获取不到节点信息报错问题
      if (this.data.listData.length === 0) {
        return;
      }
      // 异步加载数据时候, 延迟执行 initDom 方法
      setTimeout(() => this.initDom(), 1200);
    }
  },
  lifetimes: {
    ready: function () {
      this.init()
    }
  }
})