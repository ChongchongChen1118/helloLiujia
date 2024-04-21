Component({
  properties: {
    urls: {
      type: Array,
      value: [],
      observer(val) {
        this.setData({
          imgUrls: val
        })
      }
    },
    showDelete: {
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      value: false
    },
    current: {
      type: Number,
      value: 0,
      observer(val){
        this.setData({
          defCurIndex:this.data.currentIndex
        },()=>{
          setTimeout(() => {
             this.setData({
               defCurIndex:val,
               currentIndex: val
             })
          }, 20)
        })
      }
    },
    hideOnClick: {
      type: Boolean,
      value: true
    }
  },
  lifetimes:{
    ready:function(){
      this.setData({
        defCurIndex: this.data.current,
        currentIndex:this.data.current,
        imgUrls:this.data.urls
      })
    }
  },
  data: {
    imgUrls: [],
    currentIndex: 0,
    defCurIndex: 0
  },
  methods: {
    change(e) {
      this.setData({
        currentIndex:e.detail.current
      })
      this.triggerEvent('change', {
        current: e.detail.current
      });
    },
    deleteImg() {
      const imgs = this.data.imgUrls;
      const url = imgs.splice(this.data.current, 1);
      this.triggerEvent('delete', {
        url: url[0],
        index: this.data.current
      });

      if (imgs.length === 0) {
        this.hideGallery();
        return;
      }

      this.setData({
        current:0,
        imgUrls:imgs
      })
    },
    hideGallery() {
      if (this.data.hideOnClick) {
        this.triggerEvent('hide', {});
      }
    }
  }
})