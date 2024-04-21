import lottieMp from './lottie.mp.js'
Component({
  properties: {
    width: {
      type: String,
      optionalTypes:[Number],
      value: 600
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 400
    },
    options: {
      type: Object,
      value:{
        path: '',
        animationData: '',
        autoplay: true,
        loop: true
      },
      observer(vals){
        if (!this.data.mpInitFlag) return;
				this.initMp();
      }
    },
    //动画操作，可取值 play、pause、stop、destroy
    action: {
      type: String,
      value: 'play',
      observer(val){
       this.changeMpAction()
      }
    }
  },
  data: {
    aniMp: null,
    mpInitFlag: false,
    mpW: 300,
    mpH: 200
  },
  lifetimes:{
    attached:function(){
      const sys = wx.getSystemInfoSync()
      this.setData({
        mpW: sys.windowWidth / 750 * Number(this.data.width),
        mpH: sys.windowWidth / 750 * Number(this.data.height)
      })
    },
    ready:function(){
			this.initMp()
    },
    detached:function(){
      this.data.aniMp && this.data.aniMp.destroy();
      this.data.aniMp=null
    }
  },
  methods: {
    changeMpAction() {
      try {
        const actionVal = this.getAction(this.data.action)
        this.data.aniMp && this.data.aniMp[actionVal]()
      } catch (e) {
        //TODO handle the exception
      }
    },
    initMp() {
      const options = {
        ...this.data.options
      }
      if (!options.path && !options.animationData) return;
      this.data.aniMp && this.data.aniMp.destroy();
      setTimeout(() => {
        const query = wx.createSelectorQuery().in(this)
        query.selectAll('.lottie_canvas').node(res => {
          const canvas = res[0].node;
          const context = canvas.getContext('2d');
          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = this.data.mpW * dpr;
          canvas.height = this.data.mpH * dpr;
          context.scale(dpr, dpr);
          lottieMp.setup(canvas)
          this.data.aniMp = lottieMp.loadAnimation({
            loop: options.loop === undefined ? true : options.loop,
            autoplay: options.autoplay === undefined ? true : options.autoplay,
            //只支持网络地址
            path: options.path,
            animationData: options.animationData,
            rendererSettings: {
              context,
            },
          })
          this.data.mpInitFlag = true
        }).exec()
      },50);
    },
    getAction(action) {
      const actions = ['play', 'pause', 'stop', 'destroy']
      let val = 'play'
      if (~actions.indexOf(action)) {
        val = action
      }
      return val
    }
  }
})
