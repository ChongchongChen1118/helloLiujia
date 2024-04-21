Component({
  properties: {
    //跨度
    span: {
      type: Number,
      value: 24
    },
    //margin-left
    offset: {
      type: Number,
      value: 0
    },
    //右推 left
    pushLeft: {
      type: Number,
      value: -1
    },
    //左拉 right
    pullRight: {
      type: Number,
      value: -1
    },
    //max-width:767px
    xs: {
      type: Number,
      optionalTypes:[Object],
      value: -1
    },
    //max-width:768px
    sm: {
      type: Number,
      optionalTypes:[Object],
      value: -1
    },
    //max-width:992px
    md: {
      type: Number,
      optionalTypes:[Object],
      value: -1
    },
    //max-width:1200px
    lg: {
      type: Number,
      optionalTypes:[Object],
      value: -1
    },
    //max-width:1920px
    xl: {
      type: Number,
      optionalTypes:[Object],
      value: -1
    }
  },
  data: {
    classList: ['tui-col']
  },
  lifetimes:{
    attached:function(){
      this.updateCol();
    }
  },
  methods: {
    updateCol() {
      var classList = ['tui-col'];
      classList.push('tui-col-' + this.data.span);
      classList.push('tui-col-offset-' + this.data.offset);
      if (this.data.pushLeft !== -1) {
        this.data.pushLeft && classList.push('tui-col-push-' + this.data.pushLeft);
      }
      if (this.data.pullRight !== -1) {
        this.data.pullRight && classList.push('tui-col-pull-' + this.data.pullRight);
      }
      this.screenSizeSet('xs', classList);
      this.screenSizeSet('sm', classList);
      this.screenSizeSet('md', classList);
      this.screenSizeSet('lg', classList);
      this.screenSizeSet('xl', classList);
      this.setData({
        classList:classList
      })
    },
    screenSizeSet(screen, classList) {
      if (typeof this.data[screen] === 'number' && this.data[screen] !== -1) {
        classList.push('tui-col-' + screen + '-' + this.data[screen]);
      } else if (typeof this.data[screen] === 'object') {
        typeof this.data[screen].offset === 'number' && classList.push('tui-col-' + screen + '-offset-' + this.data[
          screen].offset);
        typeof this.data[screen].pushLeft === 'number' && classList.push('tui-col-' + screen + '-push-' + this.data[screen].pushLeft);
        typeof this.data[screen].pullRight === 'number' && classList.push('tui-col-' + screen + '-pull-' + this.data[screen].pullRight);
        typeof this.data[screen].span === 'number' && classList.push('tui-col-' + screen + '-' + this.data[screen].span);
      }
    }
  }
})